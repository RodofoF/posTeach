export default function IfProfComponent({ profileId, children }) {
  if (profileId === '1') {
    return children;
  }
  return null;
}