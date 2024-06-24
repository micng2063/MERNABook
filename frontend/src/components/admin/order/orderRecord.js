export function orderRecord(props){
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  
    const date = new Date(dateString);
    if (date.getTime() === 0) {
      return "---";
    }
  
    return date.toLocaleDateString(undefined, options);
  };


  const shortenID = (id, maxLength) => {
    if (id.length <= maxLength) {
      return id;
    }
    return id.substring(0, maxLength) + '...';
  };

  return (
    <tr>
      <td>{shortenID(props.order._id, 15)}</td>
      <td>{props.order.fullName}</td>
      <td className={props.order.orderStatus === "Complete" ? "text-success" : ""}>{props.order.orderStatus}</td>
      <td>{formatDate(props.order.orderDate)}</td>
      <td>{formatDate(props.order.completeDate)}</td>
      <td>${props.order.totalPrice}</td>
      <td>
      <button
        className="btn btn-block bg-primary text-white font-weight-bold"
        onClick={() => {
          props.onManage(props.order._id);
        }}
      >
        View
      </button>
      </td>
    </tr>
  );
};

export default orderRecord;