import { FaMoneyBillTrendUp } from "react-icons/fa6";
import DashboardTitle from "../../components/DashboardTitle/DashboardTitle";
import { FcSalesPerformance } from "react-icons/fc";
import { MdPointOfSale } from "react-icons/md";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { Helmet } from "react-helmet";

const SalesSummary = () => {
    const { user } = UseAuth()
    // console.log(user?.email)
    const axiosSecure = useAxiosSecure()
    const { data: sales = [] } = useQuery({
        queryKey: ['sales'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sales`)
            return res.data
        }
    })
    console.log(sales[0])
    const sellingPrice = sales[0]?.sellingPrice || 0
    const buyingPrice = sales[0]?.buyingPrice || 0
    const salesProfit = sellingPrice - buyingPrice

    return (
        <>
            <Helmet>
                <title>myStock Pro | Sales Summary</title>
            </Helmet>
            <div>
                <DashboardTitle role={'Manager'} subPage={'Sales Summary'}></DashboardTitle>
                <div className="mt-3">
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <MdPointOfSale className="text-3xl" />
                            </div>
                            <div className="stat-title font-bold">Total Sales</div>
                            <div className="stat-value text-purple-600">${sellingPrice}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FaMoneyBillTrendUp className="text-3xl" />
                            </div>
                            <div className="stat-title font-bold">Total Invest</div>
                            <div className="stat-value text-purple-600">${buyingPrice}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FcSalesPerformance className="text-3xl" />
                            </div>
                            <div className="stat-title font-bold">Total Profit</div>
                            <div className="stat-value text-purple-600">${salesProfit}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                    </div>
                </div>
                <div className="overflow-x-auto overflow-y-auto mt-4">
                    <table className="table bg-white">
                        {/* head */}
                        <thead className="bg-slate-50">
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Selling Date</th>
                                <th>Profit</th>
                            </tr>
                        </thead>

                    </table>
                </div>

            </div>
        </>
    );
};

export default SalesSummary;