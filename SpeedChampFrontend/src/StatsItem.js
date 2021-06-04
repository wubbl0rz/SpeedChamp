const StatsItem = ({ prefix, children, suffix }) => {
    return (
        <div>
            <p className="font-bold">{prefix}</p>
            <p className="font-bold text-3xl my-3">{children}</p>
            <p>{suffix}</p>
        </div>
    );
};

export default StatsItem;