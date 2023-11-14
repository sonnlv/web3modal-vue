const ConnectToGate = async () => {
  let provider = null;
  let retryCount = 0;

  return new Promise((resolve, reject) => {
    const asyncLoadProvider = async () => {
      if (typeof window.gatewallet !== 'undefined') {
        provider = window.gatewallet;

        try {
          await provider.request({method: 'eth_requestAccounts'})
        } catch (error) {
          throw new Error("Gate user Rejected");
        }

        resolve(provider);
      } else {
        if (retryCount > 20) {
          throw new Error("No Gate Provider found");
        }
        setTimeout(() =>  asyncLoadProvider(), 100);
      }

      retryCount++;
    }

    asyncLoadProvider();
  })
};

export default ConnectToGate;
