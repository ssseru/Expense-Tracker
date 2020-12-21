import React from "react"
import { Jumbotron } from "reactstrap"

export default function Header() {
    return(
        <div>
        <Jumbotron>
          <h1 className="display-6">$<b>Expense Tracker</b>$</h1>
          <p className="lead">This is a website made using ReactJS and Flask which can keep track of your incomes and expenses.</p>
          <hr className="my-0" />
        </Jumbotron>
      </div>
    )
}