import { ServersStatus, PlayerFinder, TopJobs, TopVehicles, TopTen, HighestID } from '../pages';

const _routes = [
    {
        container: PlayerFinder,
        path: '/playerfinder'
    },
    {
        container: TopJobs,
        path: '/jobs'
    },
    {
        container: TopVehicles,
        path: '/vehicles'
    },
    {
        container: TopTen,
        path: '/top10'
    },
    {
        container: HighestID,
        path: '/highest_id'
    },
    {
        container: ServersStatus,
        path: '/'
    },
];

export default _routes;