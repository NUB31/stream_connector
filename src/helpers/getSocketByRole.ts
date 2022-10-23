import { clients, io } from "./socket";

export default async function getSocketByRole(role: string) {
  const sockets = await io.fetchSockets();

  const clientsWithRole = clients.filter((client) => client.role === role);

  if (clientsWithRole.length === 0) return null;
  return sockets.filter(
    (socket) =>
      socket.id === clientsWithRole[clientsWithRole.length - 1].socketId
  )[0];
}
