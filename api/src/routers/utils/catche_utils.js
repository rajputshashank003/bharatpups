export let catched_dogs = null;
export let is_data_updated = true;

export const database_updated = async () => {
    is_data_updated = true;
    await fetch(`${process.env.VITE_MOCK_API}/api/dog/updated`);
}
