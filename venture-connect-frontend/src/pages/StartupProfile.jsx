import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faGlobe,
  faIndianRupee,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { IoStatsChart } from 'react-icons/io5';
import { MdOutlineTrendingUp } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { Card, Progress, Spin } from 'antd';
import { useEffect } from 'react';
import { useStartupProfileStore } from '../store/useStartupProfileStore';
import { Link, useNavigate } from 'react-router-dom';
import { formatAmount } from '../utils/formatUtils';
import { useUserStore } from '../store/useUserStore';
const StartupProfile = () => {
  const navigate = useNavigate();
  const { getStartupProfile, startupProfile, setLoading, loading } =
    useStartupProfileStore();
  const { userId } = useUserStore();
  console.log(userId);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getStartupProfile(userId);
      setLoading(false);
    };
    fetchData();
  }, [getStartupProfile, userId]);

  const { basicInfo, metrics, team } = startupProfile || {};

  const minRevenue = 20000;
  const maxRevenue = 20000000;
  const annualRevenue = metrics?.annualRevenue || minRevenue;

  const revenueProgress =
    ((annualRevenue - minRevenue) / (maxRevenue - minRevenue)) * 100;

  const progress = Math.max(0, Math.min(100, revenueProgress));

  return (
    <>
      <div
        className="md:py-5 py-3 md:px-15 px-5 border-b border-gray-200 bg-gray-50 cursor-pointer"
        onClick={() => navigate('/startups-hub')}
      >
        <p>
          <FontAwesomeIcon icon={faChevronLeft} className="pe-5" />
          Return to Dashboard
        </p>
      </div>

      {loading ? (
        <Spin tip="Loading..." size="large" fullscreen />
      ) : (
        <div className="md:pt-10 md:pb-5 md:px-12 pt-5 pb-3 px-5">
          <div className="flex gap-x-10 gap-y-2 items-center border-b pb-5 border-gray-100 flex-wrap">
            <img
              src={basicInfo?.startup_logo}
              alt={basicInfo?.startup_name}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="space-y-2">
              <div className="flex gap-x-5 gap-y-1 items-center flex-wrap">
                {basicInfo?.startup_name && (
                  <p className="text-3xl md:text-4xl font-bold">
                    {basicInfo.startup_name}
                  </p>
                )}
                {basicInfo?.stage && (
                  <p className="text-green-700 text-sm md:text-base bg-green-100 rounded-full px-2 py-1">
                    {basicInfo.stage}
                  </p>
                )}
                {basicInfo?.industry && (
                  <p className="text-blue-700 text-sm md:text-base bg-blue-100 rounded-full px-2 py-1">
                    {basicInfo.industry}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-x-5 flex-wrap">
                {basicInfo?.location && (
                  <p className="flex items-center gap-1.5 text-gray-800/75 font-normal">
                    <FontAwesomeIcon icon={faLocationDot} />
                    {basicInfo.location}
                  </p>
                )}
                {basicInfo?.website && (
                  <Link
                    target="_blank"
                    to={basicInfo.website}
                    className="text-blue-500 flex items-center gap-1.5 font-normal"
                  >
                    <FontAwesomeIcon icon={faGlobe} />
                    {basicInfo.website}
                  </Link>
                )}
                {basicInfo?.linkedin_url && (
                  <Link target="_blank" to={basicInfo.linkedin_url}>
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="text-gray-800/75"
                    />
                  </Link>
                )}
                {basicInfo?.twitter_url && (
                  <Link target="_blank" to={basicInfo.twitter_url}>
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="text-gray-800/75"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-7">
            {[
              {
                icon: <FaUsers className="text-blue-600 text-4xl" />,
                value: formatAmount(`${basicInfo?.team_size}`),
                label: 'Team Size',
              },
              {
                icon: (
                  <MdOutlineTrendingUp className="text-blue-600 text-4xl" />
                ),
                value: formatAmount(`${metrics?.mrr}`),
                label: 'MRR',
              },
              {
                icon: <IoStatsChart className="text-blue-600 text-4xl" />,
                value: `${metrics?.yoy}%`,
                label: 'YoY Growth',
              },
              {
                icon: (
                  <FontAwesomeIcon
                    icon={faIndianRupee}
                    className="text-blue-600 text-4xl"
                  />
                ),
                value: formatAmount(`${metrics?.total_funding}`),
                label: 'Total Raised',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 h-40 rounded-2xl p-6 flex flex-col items-center text-center"
              >
                {stat.icon}
                <p className="font-bold text-xl md:text-2xl mt-3">
                  {stat.value}
                </p>
                <p className="text-gray-500 font-medium text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xl font-bold text-slate-950 mb-3">Overview</p>
            <Card>
              <p className="text-gray-800/75 text-base">
                {basicInfo?.company_overview}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 text-base">
                <div>
                  <p className="text-slate-950 font-bold text-lg">
                    Key Highlights
                  </p>
                  <ul className="list-disc list-inside text-gray-800/75 space-y-0.5 marker:text-blue-600">
                    <li>{basicInfo?.keyHighlight1}</li>
                    <li>{basicInfo?.keyHighlight2}</li>
                    <li>{basicInfo?.keyHighlight3}</li>
                  </ul>
                </div>
                <div>
                  <p className="text-slate-950 font-bold text-lg">
                    Investment Details
                  </p>
                  <div className="space-y-0.5">
                    <p className="text-gray-800/75 flex justify-between">
                      <span>Investment Required:</span>
                      <span className="font-medium">
                        ₹{formatAmount(metrics?.investment_amount)}
                      </span>
                    </p>
                    <p className="text-gray-800/75 flex justify-between">
                      <span>Equity Offered:</span>
                      <span className="font-medium">
                        {formatAmount(metrics?.equity_offered)}%
                      </span>
                    </p>
                    <p className="text-gray-800/75 flex justify-between">
                      <span>Current Valuation:</span>
                      <span className="font-medium">
                        ₹{formatAmount(metrics?.current_valuation)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-7">
            <p className="text-xl font-bold text-slate-950 mb-3">Leadership</p>
            <Card className="w-full">
              <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center">
                <img
                  src={team?.founder_image}
                  alt={team?.founder_name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="text-center md:text-left space-y-0.5">
                  <p className="text-xl font-bold text-slate-950">
                    {team?.founder_name}
                  </p>
                  <p className="text-blue-500 font-medium text-base">
                    Founder & CEO
                  </p>
                  <p className="text-gray-800/75 font-medium text-base">
                    {team?.overview}
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
              {team?.teamMember &&
                team?.teamMember?.map((member) => (
                  <Card key={member.id} className="w-full">
                    <div className="flex flex-col sm:flex-row gap-5 md:gap-10 items-center">
                      <img
                        src={member?.profile_image}
                        alt={member?.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="text-center md:text-left">
                        <p className="text-xl font-bold text-slate-950">
                          {member?.name}
                        </p>
                        <p className="text-blue-500 font-medium text-base">
                          {member?.position}
                        </p>
                        <p className="text-gray-800/75 font-medium text-base">
                          {member?.bio}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="text-xl font-bold text-slate-950 mb-3">
              Financial Performance
            </p>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <Card className="w-full md:w-1/2">
                <p className="text-lg font-bold text-gray-800 mb-3">
                  Revenue & Growth
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="flex justify-between text-base md:text-lg text-gray-800/75 font-medium gap-2">
                      <span>Annual Revenue</span>
                      <span>₹{formatAmount(metrics?.annualRevenue)}</span>
                    </p>
                    <Progress percent={progress} showInfo={false} />
                  </div>
                  <div>
                    <p className="flex justify-between md:text-lg text-base text-gray-800/75 font-medium gap-2">
                      <span>Profit Margin</span>
                      <span>{formatAmount(metrics?.profitMargin)}%</span>
                    </p>
                    <Progress
                      percent={formatAmount(metrics?.profitMargin)}
                      showInfo={false}
                      strokeColor="#52c41a"
                    />
                  </div>
                </div>
              </Card>
              <Card className="w-full md:w-1/2">
                <p className="text-lg font-bold text-gray-800 mb-3">
                  Key Stats
                </p>
                <div className="space-y-1.5 text-base">
                  {metrics?.cac && (
                    <p className="text-gray-800/75 flex justify-between gap-2">
                      <span>Customer Acquisition Cost:</span>
                      <span className="font-medium">
                        ₹{formatAmount(metrics.cac)}
                      </span>
                    </p>
                  )}
                  {metrics?.ltv && (
                    <p className="text-gray-800/75 flex justify-between gap-2">
                      <span>Lifetime Value (LTV):</span>
                      <span className="font-medium">
                        ₹{formatAmount(metrics.ltv)}
                      </span>
                    </p>
                  )}
                  {metrics?.monthly_burn_rate && (
                    <p className="text-gray-800/75 flex justify-between gap-2">
                      <span>Burn Rate:</span>
                      <span className="font-medium">
                        ₹{formatAmount(metrics?.monthly_burn_rate)}
                      </span>
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartupProfile;
