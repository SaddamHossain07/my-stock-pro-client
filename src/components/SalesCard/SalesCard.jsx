import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { FaCartPlus } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";


const SalesCard = ({ item, index }) => {
    const { user } = UseAuth()

    const axiosSecure = useAxiosSecure()
    const { _id, name, image, buyingPrice, sellingPrice, profitMargin } = item
    const profit = sellingPrice - buyingPrice

    const handleAddForCheckOut = item => {
        const AddedItem = {
            productId: _id,
            shopManager: user.email,
            name,
            image,
            buyingPrice,
            sellingPrice,
            profit
        }

        axiosSecure.post('/carts', AddedItem)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} added for checkout`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <tr key={item._id}>
            <td>
                {index + 1}
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-24 h-16">
                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="font-semibold">{item.name}</div>
            </td>
            <td>{item.quantity}</td>
            <td>{item.discount}%</td>
            <td>${item.sellingPrice}</td>
            <td>
                <button onClick={() => handleAddForCheckOut(item)} className="btn text-purple-600 font-bold flex items-center gap-2 bg-slate-100">
                    <FaCartPlus />Add for Check-Out
                </button>

            </td>
        </tr>
    );
};

export default SalesCard;