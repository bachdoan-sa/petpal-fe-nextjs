// import node module libraries
import Link from 'next/link';

// import required data files
const ActiveProjectsData = [
    {
        id: 1,
        projectName: "Dropbox Design System",
        priority: "Medium",
        priorityBadgeBg: 'warning',
        hours: 34,
        progress: 15,
        brandLogo: '/images/brand/dropbox-logo.svg',
        brandLogoBg: 'bg-white',
        members: [
            { image: 'images/avatar/avatar-1.jpg' },
            { image: 'images/avatar/avatar-2.jpg' },
            { image: 'images/avatar/avatar-3.jpg' }
        ]
    },
    {
        id: 2,
        projectName: "Slack Team UI Design",
        priority: "High",
        priorityBadgeBg: 'danger',
        hours: 47,
        progress: 35,
        brandLogo: '/images/brand/slack-logo.svg',
        brandLogoBg: 'bg-white',
        members: [
            { image: 'images/avatar/avatar-4.jpg' },
            { image: 'images/avatar/avatar-5.jpg' },
            { image: 'images/avatar/avatar-6.jpg' }
        ]
    },
    {
        id: 3,
        projectName: "GitHub Satellite",
        priority: "Low",
        priorityBadgeBg: 'info',
        hours: 120,
        progress: 75,
        brandLogo: '/images/brand/github-logo.svg',
        brandLogoBg: 'bg-white',
        members: [
            { image: 'images/avatar/avatar-7.jpg' },
            { image: 'images/avatar/avatar-8.jpg' },
            { image: 'images/avatar/avatar-9.jpg' }
        ]
    },
    {
        id: 4,
        projectName: "3D Character Modelling",
        priority: "Medium",
        priorityBadgeBg: 'warning',
        hours: 89,
        progress: 63,
        brandLogo: '/images/brand/3dsmax-logo.svg',
        brandLogoBg: 'bg-white',
        members: [
            { image: 'images/avatar/avatar-10.jpg' },
            { image: 'images/avatar/avatar-11.jpg' },
            { image: 'images/avatar/avatar-12.jpg' }
        ]
    },
    {
        id: 3,
        projectName: "Webapp Design System",
        priority: "Track",
        priorityBadgeBg: 'success',
        hours: 108,
        progress: 100,
        brandLogo: '/images/brand/layers-logo.svg',
        brandLogoBg: 'bg-primary',
        members: [
            { image: 'images/avatar/avatar-13.jpg' },
            { image: 'images/avatar/avatar-14.jpg' },
            { image: 'images/avatar/avatar-15.jpg' }
        ]
    },
    {
        id: 4,
        projectName: "Github Event Design",
        priority: "Low",
        priorityBadgeBg: 'info',
        hours: 120,
        progress: 75,
        brandLogo: '/images/brand/github-logo.svg',
        brandLogoBg: 'bg-white',
        members: [
            { image: 'images/avatar/avatar-16.jpg' },
            { image: 'images/avatar/avatar-17.jpg' },
            { image: 'images/avatar/avatar-18.jpg' }
        ]
    }
];
function ActiveProjects() {
    return (
        <div className="row mt-6">
            <div className="col-12">
                <div className="card">
                    <div className="card-header bg-white py-4">
                        <h4 className="mb-0">Danh sách gói được sử dụng trong ngày:</h4>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th style={{borderRadius:"0"}}>Project name</th>
                                    <th>Hours</th>
                                    <th>priority</th>
                                    <th>Members</th>
                                    <th style={{borderRadius:"0"}}>Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ActiveProjectsData.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="align-middle border-default">
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}>
                                                            <img src={item.brandLogo} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="ms-3 lh-1">
                                                        <h5 className=" mb-1">
                                                            <Link href="#" className="text-inherit">{item.projectName}</Link></h5>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle border-default">{item.hours}</td>
                                            <td className="align-middle border-default"><span className={`badge bg-${item.priorityBadgeBg}`}>{item.priority}</span></td>
                                            <td className="align-middle border-default">
                                                <div className="avatar-group">
                                                    {item.members.map((avatar, avatarIndex) => {
                                                        return (
                                                            <span className="avatar avatar-sm" key={avatarIndex}>
                                                                <img alt="avatar" src={avatar.image} className="rounded-circle" />
                                                            </span>
                                                        )
                                                    })}
                                                    <span className="avatar avatar-sm avatar-primary">
                                                        <span className="avatar-initials rounded-circle fs-6">+5</span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="align-middle border-default text-dark">
                                                <div className="float-start me-3">{item.progress}%</div>
                                                <div className="mt-2">
                                                    <div className="progress" style={{ height: "5px" }}>
                                                        <div className="progress-bar" role="progressbar" style={{ width: `${item.progress}%` }} aria-valuenow={item.progress} aria-valuemin={0} aria-valuemax={100}></div>
                                                    </div>


                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer bg-white text-center">
                        <Link href="#" className="link-primary">View All Projects</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActiveProjects