const ConnectToOkx = async () => {
  let provider = null;
  let retryCount = 0;

  return new Promise((resolve, reject) => {
    const asyncLoadProvider = async () => {
      if (typeof window.okxwallet !== 'undefined') {
        provider = window.okxwallet;

        try {
          await provider.request({method: 'eth_requestAccounts'})
        } catch (error) {
          throw new Error("Okx user Rejected");
        }

        resolve(provider);
      } else {
        if (retryCount > 20) {
          throw new Error("No Okx Provider found");
        }
        setTimeout(() =>  asyncLoadProvider(), 100);
      }

      retryCount++;
    }

    asyncLoadProvider();
  })
};

export default ConnectToOkx;
