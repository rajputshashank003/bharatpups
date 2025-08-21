const GetShortName = ({ food_name, length = 15 }) => {
    if (food_name?.length <= length) {
        return <>{food_name}</>;
    }
    return (
        <>
            {food_name?.substring(0, length)}...
        </>
    );
};

export default GetShortName;