export const cache_state = {
    catched_dogs: null,
    is_data_updated: true
};

export const database_updated = async () => {
    try {
        cache_state.is_data_updated = true;
        await fetch(`${process.env.VITE_MOCK_API}/api/dog/updated`);
    } catch (err) {
        console.log(err.message);
    }
};
