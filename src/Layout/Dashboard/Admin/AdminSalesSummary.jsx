import { Helmet } from "react-helmet";
import DashboardTitle from "../../../components/DashboardTitle/DashboardTitle";
import { FaMoneyBillTrendUp, FaSackDollar } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";


const AdminSalesSummary = () => {

    const axiosSecure = useAxiosSecure()

    const { data: admin = [] } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data
        }
    })

    return (
        <>
            <Helmet>
                <title>myStock Pro | Sales Summary</title>
            </Helmet>
            <div>
                <DashboardTitle role={'Admin'} subPage={'Sales Summary'}></DashboardTitle>
                <div className="mt-3 w-full">
                    <div className="stats shadow w-full">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <FaSackDollar className="text-3xl" />
                            </div>
                            <div className="stat-title font-bold">Total Income</div>
                            <div className="stat-value text-purple-600">${admin?.admin?.income}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <MdOutlineProductionQuantityLimits className="text-3xl" />
                            </div>
                            <div className="stat-title font-bold">Total Product</div>
                            <div className="stat-value text-purple-600">{admin?.totalProduct}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-error">
                                <FaMoneyBillTrendUp className="text-3xl" />
                            </div>
                            <div className="stat-title font-bold">Total Sales</div>
                            <div className="stat-value text-purple-600">{admin?.totalSalesCount}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FcSalesPerformance className="text-3xl" />
                            </div>
                            <div className="stat-title font-bold">Total Revenue</div>
                            <div className="stat-value text-purple-600">${admin?.revenue}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                    </div>
                </div>
                <div className="overflow-x-auto overflow-y-auto mt-4">

                </div>

            </div>
        </>
    );
};

export default AdminSalesSummary;