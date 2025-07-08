import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching the food list.");
      console.error("Fetch List Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { id: foodId }
        // headers: { Authorization: `Bearer ${token}` } // ← Optional if auth is needed
      );
      if (response.data.success) {
        toast.success("Food item removed!");
        fetchList();
      } else {
        toast.error(response.data.message || "Failed to delete food item.");
      }
    } catch (error) {
      toast.error("Error deleting food item.");
      console.error("Delete Food Error:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="list-table">
          <div className='list-table-format title'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list.length === 0 ? (
            <p style={{ marginTop: '1rem' }}>No food items found.</p>
          ) : (
            list.map((item, index) => (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <p
                  className='cursor'
                  onClick={() => removeFood(item._id)}
                  title="Remove item"
                >
                  ❌
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default List;
