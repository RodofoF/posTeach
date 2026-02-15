export default function IfProfComponent({ isProf, children }) {
  if (isProf) {
    return children;
  }
  return null;
}