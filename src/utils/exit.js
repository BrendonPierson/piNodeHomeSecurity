export default function exit(pins) {
  console.log("Exiting cleanly from program.")
  pins.forEach((pin) => pin.unexport())
  process.exit()
}
