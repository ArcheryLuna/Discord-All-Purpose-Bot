export default interface IHandler {
  LoadEvents: () => Promise<void>;
}
