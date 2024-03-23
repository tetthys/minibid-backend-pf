export default interface Observer {
  update(temperature: number, humidity: number, pressure: number): void;

  addUpdateCount(): void; // for testing purposes
  
  getUpdateCount(): number; // for testing purposes
}
