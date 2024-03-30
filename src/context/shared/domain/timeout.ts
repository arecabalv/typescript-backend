export const timeout = async <T>(promise: Promise<T>, time: number, errorMessage: string = 'Exceeded timeout error'): Promise<T> => {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<any>((_r, reject) => {
    timer = setTimeout(() => {
      reject(new Error(errorMessage));
    }, time);
  });

  return Promise.race([
    promise,
    timeoutPromise,
  ]).finally(() => clearTimeout(timer));
};
