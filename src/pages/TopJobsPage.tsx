import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from '../store/DataContext';
import { companyTags } from '../data/companyData';
import ContentBlock from '../components/ContentBlock';

interface Job {
  [tag: string]: number;
}

interface JobState {
  entries: [companyTag: string, count: number][];
  counter: number;
}

export default function TopJobsPage() {
  const { servers } = useDataContext();
  const [jobsState, setJobsState] = useState<JobState>({ entries: [], counter: 0 });
  const [companyJobsState, setCompanyJobsState] = useState<JobState>({ entries: [], counter: 0 });

  useEffect(() => {
    const jobs: Job = {};
    const companyJobs: Job = {};
    companyTags.forEach(([jobTitle]) => (companyJobs[jobTitle] = 0));

    for (const key in servers) {
      if (servers[key].loaded === true && servers[key].playersData !== null) {
        servers[key].playersData!.forEach((player) => {
          if (!jobs.hasOwnProperty(player[5])) {
            jobs[player[5]] = 1;
          } else {
            jobs[player[5]]++;
          }

          const companyJobFound = companyTags.find((job) => player[5].startsWith(job[1]));
          if (companyJobFound) {
            companyJobs[companyJobFound[0]]++;
          }
        });
      }
    }

    const sortedJobs = Object.entries(jobs).sort((item1, item2) => item2[1] - item1[1]);
    const sortedCompanyJobs = Object.entries(companyJobs).sort((item1, item2) => item2[1] - item1[1]);

    setJobsState((s) => ({
      entries: sortedJobs,
      counter: sortedJobs.reduce((acc, val) => acc + val[1], 0),
    }));

    setCompanyJobsState((s) => ({
      entries: sortedCompanyJobs,
      counter: sortedCompanyJobs.reduce((acc, val) => acc + val[1], 0),
    }));
  }, [servers]);

  return (
    <>
      <ContentBlock title="Top Jobs Now">
        <div className="text-center max-h-[500px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-400 dark:bg-kebab-bg-dm">
              <tr>
                <th>%</th>
                <th>Job Name</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobsState.counter === 0 ? (
                <tr>
                  <td>-</td>
                  <td>No Data</td>
                  <td>N/A</td>
                </tr>
              ) : (
                jobsState.entries.map((job, index) => {
                  return (
                    <tr key={index} className='odd:bg-kebab-odd even:bg-kebab-even hover:bg-kebab-dk'>
                      <td data-label="%">{Number((job[1] / jobsState.counter) * 100).toFixed(1)}%</td>
                      <td data-label="Job Name">{job[0]}</td>
                      <td data-label="Active">{job[1]}</td>
                      <td data-label="Links">
                        <Link to={encodeURI('/playerfinder?job=' + job[0])} className="lnk-btn">
                          Players
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </ContentBlock>
      <ContentBlock title="Top Company Jobs Now">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>%</th>
              <th>Job Name</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {companyJobsState.counter === 0 ? (
              <tr>
                <td>-</td>
                <td>No Data</td>
                <td>N/A</td>
              </tr>
            ) : (
              companyJobsState.entries.map((job, index) => {
                return (
                  <tr key={index} className='odd:bg-kebab-odd even:bg-kebab-even hover:bg-kebab-dk'>
                    <td data-label="%">{Number((job[1] / companyJobsState.counter) * 100).toFixed(1)}%</td>
                    <td data-label="Job Name">{job[0]}</td>
                    <td data-label="Active">{job[1]}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </ContentBlock>
    </>
  );
}
