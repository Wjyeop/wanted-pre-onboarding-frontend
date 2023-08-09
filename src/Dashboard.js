import { Link } from "react-router-dom"

function Dashboard() {
    return(
        <div>
            안녕 난 대시보드야
            <Link to="/signin">로그인</Link>
            <Link to="/signup">회원가입</Link>
        </div>
    )
}

export default Dashboard;
