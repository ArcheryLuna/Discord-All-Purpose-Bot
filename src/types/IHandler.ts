export default interface IHandler {
  RegisterCommands: () => void;
  LoadEvents: () => void;
  LoadSlashCommands: () => void;
}
