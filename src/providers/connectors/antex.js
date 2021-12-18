const ConnectToAntex = async () => {
  let provider = null;
  let retryCount = 0;

  return new Promise((resolve, reject) => {
    const asyncLoadProvider = async () => {
      if (typeof window.ethereumAntex !== 'undefined') {
        provider = window.ethereumAntex;

        try {
          await provider.request({method: 'eth_requestAccounts'})
        } catch (error) {
          throw new Error("Antex user Rejected");
        }

        resolve(provider);
      } else {
        if (retryCount > 20) {
          throw new Error("No Antex Provider found");
        }
        setTimeout(() =>  asyncLoadProvider(), 100);
      }

      retryCount++;
    }

    asyncLoadProvider();
  })
};

export default ConnectToAntex;
