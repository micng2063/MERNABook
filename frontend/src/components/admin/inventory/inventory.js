const Inventory = (props) => (
  <tr>
    <td style={{ verticalAlign: "middle" }}>
      {props.inventory.showListing ? (
        <i className="fa fa-eye text-info"></i>
      ) : (
        <i className="fa fa-eye-slash text-gray"></i>
      )}
    </td>
    <td style={{ verticalAlign: "middle" }}>
      <img style={{ width: "50px", verticalAlign: "middle" }} src={props.inventory.imageurl} alt="Textbook" />
    </td>
    <td style={{ verticalAlign: "middle" }}>{props.inventory.isbn}</td>
    <td style={{ verticalAlign: "middle" }}>{props.inventory.title}</td>
    <td style={{ verticalAlign: "middle" }}>${props.inventory.price}</td>
    <td style={{ verticalAlign: "middle", textAlign:"center" }} className={props.inventory.quantity < 10 ? "text-danger" : ""}>
      {props.inventory.quantity}
    </td>

    <td style={{ verticalAlign: "middle" }}>
      <button
        className="btn btn-block bg-primary text-white font-weight-bold"
        onClick={() => {
          props.onEdit(props.inventory._id);
          props.setShowSwitch(true);
        }}
      >
        View
      </button>
    </td>
  </tr>
);

export default Inventory;