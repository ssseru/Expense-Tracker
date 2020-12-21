import React from "react"
import { Card } from "reactstrap"

class Transactions extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <div className="container">
                    {this.props.list.map(expense => (
                        <div className="container">
                        <Card style={{background: "#d1c4e9"}}>
                            <p>
                                <b>Amount:</b> {expense.amount}<br />
                                <b>Category:</b> {expense.category ? expense.category : expense.source}<br />
                                <b>Date of expense:</b> {expense.date}
                            </p>
                        </Card>
                        <br />
                        </div>
                    ))}
            </div>
        )
    }
}

export default Transactions