import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

const AllProduct = () => {
    const axiosSecure = useAxiosSecure()

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products`)
            return res.data
        }
    })

    console.log(products)
    return (
        <div className="bg-slate-200 w-full p-4 lg:p-16">
            <h2 className="text-4xl text-gray-600 font-bold  text-center">Best Products from out happy clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full justify-center mt-16">
                {
                    products?.map(product => <div key={product._id} className="card bg-base-100 shadow-xl overflow-hidden">
                        <img className="w-full h-56" src={product.image} alt="Shoes" />
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p>{product.shopName}</p>
                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default AllProduct;