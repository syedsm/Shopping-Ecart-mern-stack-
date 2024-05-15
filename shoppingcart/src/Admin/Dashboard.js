import Left from "./Leftmenu";

function Dashboard() {
    return (

        <section id="mid">
            <div className="container">
                <div className="row">
                    <Left/>
                    <div className="col-md-9 text-center fs-3 fw-bold">Shopping-Cart</div>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;