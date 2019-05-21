import React from 'react';
import PropTypes from 'prop-types';
import Margin from '../components/margin';
// import UserRow from '../components/user_row';
import './css/briefing.css';

export default class Briefing extends React.Component {

    render() {

        const currentTotalBalance = (
            <div id="current-total-balance" className="column">
                <Desc>Total Balance</Desc>
                <Money>700</Money>
            </div>
        )
        
        return (
            <div id="briefing-container" className='grid fill-parent'
                style={{
                    gridColumnGap: "1rem",
                }}>
                <div
                    style={{
                        textAlign: "center",
                    }}>
                    {currentTotalBalance}
                </div>

                <div>
                    <div id="principal-rent-due" className="row"
                        style={{
                            margin: "1rem 0",
                        }}>
                        <SubDesc>
                            <div className="row flex-centered">
                                Rent:<Margin width="0.2rem" /><SubMoney>650</SubMoney>
                            </div>
                            <div className="row flex-centered">
                                Due by<Margin width="0.2rem" /><SubText>01/12/19</SubText>
                            </div>
                        </SubDesc>  
                    </div>

                    <div id="rent-paid-list" className="paid-list">
                        {/* <UserRow name={"Eddie"}
                            paid={true}
                            backgroundColor="lime" />
                        <UserRow name={"Player 1"}
                            paid={false}
                            backgroundColor="red" />
                        <UserRow name={"Player 1"}
                            paid={true}
                            backgroundColor="red" />
                        <UserRow name={"Player 1"}
                            paid={false}
                            backgroundColor="red" /> */}
                    </div>
                </div>

                <div>
                    <div id="principal-utilities-due" className="row"
                        style={{
                            margin: "1rem 0",
                        }}>
                        <SubDesc>
                            <div className="row flex-centered">
                                Utilities:<Margin width="0.2rem" /><SubMoney>50</SubMoney>
                            </div>
                            <div className="row flex-centered">
                                Due by<Margin width="0.2rem" /><SubText>01/12/19</SubText>
                            </div>
                        </SubDesc> 
                    </div>

                    <div id="utilities-paid-list" className="paid-list">
                        {/* <UserRow name={"Eddie"}
                            paid={false}
                            owes={25}
                            height="1.3rem"
                            fontSize="1.3rem"
                            backgroundColor="lime" />
                        <UserRow name={"Player 1"}
                            paid={false}
                            height="1rem"
                            fontSize="1rem"
                            backgroundColor="red" />
                        <UserRow name={"Player 1"}
                            paid={true}
                            height="1rem"
                            fontSize="1rem"
                            backgroundColor="red" />
                        <UserRow name={"Player 1"}
                            paid={false}
                            height="1rem"
                            fontSize="1rem"
                            backgroundColor="red" /> */}
                    </div>
                </div>

                <div id="the-pots-cash" className="row fill"
                    style={{
                        justifyContent: "space-around",
                    }}>
                    {/* Total cash in pot.
                    Balance of things to pay for.
                    Expiration. */}
                    <div id="total-cash-in-pot" className="column flex-centered">
                        <div>Cash in pot</div>
                        <SubMoney>350</SubMoney>
                    </div>
                    <div id="total-item-worth-in-pot" className="column flex-centered">
                        <div>Items in pot</div>
                        <SubMoney>500</SubMoney>
                    </div>
                </div>
            </div>
        )
    }
}

// /**
//  * Displays self as either unpaid - showing current balance
//  * or paid - "PAID!"
//  * @param {any} props 
//  */
// function Me(props) {
//     const name = "Eddie";

//     return (
//         <UserRow name={name}
//             backgroundColor="lime" />
//     )
// }

function Desc(props) {
    return (
        <div className="title">
            {props.children}
        </div>
    )
}

function SubDesc(props) {
    return (
        <div className="column flex-centered title-small">
            {props.children}   
        </div>
    )
}

function Money(props) {
    const value = parseInt(props.children, 10);

    return (
        <div className="money-title-large">
            ${value.toFixed(2)}
        </div>
    )
}

function SubMoney(props) {
    const value = parseInt(props.children, 10);

    return (
        <div className="money-title-medium">
            ${value.toFixed(2)}
        </div>
    )
}

function SubText(props) {
    return (
        <div className="title-large">
            {props.children}
        </div>
    )
}

Money.propTypes = {
    children: PropTypes.string.isRequired,
}