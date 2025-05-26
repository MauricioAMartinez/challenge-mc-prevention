export async function fetchUserData(token: string) {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/user-data?token=${token}`,{
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch user data');
    return await res.json();
  } catch (e) {
    return {};
  }
}