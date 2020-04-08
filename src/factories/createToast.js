let id = 0;

const defaultOptions = {
  color: "#6796e6"
};

export default function createToast(options) {
  return {
    ...defaultOptions,
    ...options,
    id: id++
  }
}