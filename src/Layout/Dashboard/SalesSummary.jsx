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
    const axiosSecure = useAxiosSecure()

    const { data: stats = [] } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sales-stats/${user?.email}`)
            return res.data
        }
    })
    console.log(stats)

    const { data: mySales = [] } = useQuery({
        queryKey: ['mySales'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sales/${user?.email}`)
            return res.data
        }
    })
    console.log('this is my sell', mySales)

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
                            <div className="stat-value text-purple-600">${stats?.totalSellingPrice}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FaMoneyBillTrendUp className="text-3xl" />
                            </div>
                            <div className="stat-title font-bold">Total Invest</div>
                            <div className="stat-value text-purple-600">${stats?.totalBuyingPrice}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FcSalesPerformance className="text-3xl" />
                            </div>
                            <div className="stat-title font-bold">Total Profit</div>
                            <div className="stat-value text-purple-600">${stats?.profit}</div>
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
                        <tbody>
                            {
                                mySales?.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="font-semibold">{item.productName}</div>
                                    </td>
                                    <td>
                                        <div className="font-semibold">{item.sellingDate}</div>
                                    </td>
                                    <td>
                                        <div className="font-semibold">{item.profit}</div>
                                    </td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                    <div className="w-full flex justify-center">
                        <div className="join my-4 text-center">
                            <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="1" checked />
                            <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="2" />
                            <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="3" />
                            <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="4" />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default SalesSummary;