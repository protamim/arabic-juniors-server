export async function getUserLocation() {
  const res = await fetch("https://ipwho.is");
  const data = await res.json();
  return data;
}
