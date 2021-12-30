import { Component } from "react";

interface IProps {
    order?: any
}

class Card extends Component<IProps, {}> {

    render() {
        return (
            <div className="card">
                <div className="card__container">
                    <div className="card__col">
                        <div className="card__row">
                            <div className="card__col">
                                <div className="card__row">
                                    <span className="orders-table__order-id">
                                        {this.props.order.orderId}
                                    </span>
                                    <span className="card__label ml-1">Order ID</span>
                                </div>
                            </div>

                            <div className="card__col status-container">
                                <span className="status">
                                    {this.props.order.formattedOrderType}
                                </span>
                            </div>
                        </div>
                        <div className="card__row">
                            <span className="card__col">
                                <span className="card__label">Customer name</span>
                                <span>{this.props.order.customerName}</span>
                                <span className="card__label mt-1">Created by</span>
                                <span>{this.props.order.createdByUserName}</span>
                                <span className="card__label mt-1">Created</span>
                                <span>{this.props.order.createdDate}</span>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Card;
