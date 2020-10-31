import React from "react"
import { Jumbotron } from "reactstrap"

export default function Header() {
    return(
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>$$ Expense Tracker $$</h1>
                        </div>
                    </div>
                </div>
            </Jumbotron>
    )
}