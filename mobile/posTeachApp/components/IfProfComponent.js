export default function IfProfComponent({ profileId, children }) {
  if (profileId == 1) {
    return children;
  }
  return null;
}
// 0 - Full admin - Ainda não implementado
// 1 - Admin / Professor
// 2 - Aluno / User