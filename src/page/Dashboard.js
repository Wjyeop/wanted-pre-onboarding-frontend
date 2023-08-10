import { Link } from "react-router-dom"

function Dashboard() {
    return(
        <div className="dashboard">
            <h1>대시보드</h1>
            <div>
                <Link to="/signin">로그인</Link>
                <Link to="/signup">회원가입</Link>
            </div>
        </div>
    )
}

export default Dashboard;
