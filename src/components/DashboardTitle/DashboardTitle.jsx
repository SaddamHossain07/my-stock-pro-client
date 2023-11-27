
const DashboardTitle = ({ role, subPage }) => {
    return (
        <h3 className="text-sm font-semibold bg-gradient-to-r from-slate-200 via-white to-slate-200 inline-block p-2">{role} / {subPage}</h3>
    );
};

export default DashboardTitle;