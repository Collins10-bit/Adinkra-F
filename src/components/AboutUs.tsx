import React, { useState } from 'react';
import { Target, Eye, Sparkles, CheckCircle2, Users, ChevronDown, Award, Briefcase, ShieldCheck } from 'lucide-react';
import type { ValueItem, TeamMember } from '../types.ts';

// Editable content structure
export const companyOverviewData = {
  title: 'About Adinkra Frontiers Ltd',
  subtitle: 'Committed to Quality Poultry Agribusiness',
  overview:
    'Adinkra Frontiers Ltd is committed to reliable poultry production, product quality, good farm management, and dependable customer service. Operating from our farm location at Sanfo/Aduam, behind Manale Rest Stop in Ghana, we manage our poultry flocks and egg production with careful oversight to ensure hygienic, fresh, and consistent supply for our clients.',
  mission:
    'To provide fresh, high-quality poultry products and table eggs through disciplined farm management, dependable customer relationships, and responsible agricultural practices.',
  vision:
    'To expand the frontiers of poultry agribusiness in Ghana and beyond as a trusted, household and commercial brand known for freshness, integrity, and consistent supply.',
  values: [
    {
      title: 'Quality',
      description: 'Maintaining stringent egg sorting, cleanliness, and fresh daily collection for all orders.',
    },
    {
      title: 'Reliability',
      description: 'Consistently meeting delivery agreements and standing supply requirements without disruption.',
    },
    {
      title: 'Professionalism',
      description: 'Upholding clear communication, honest business relationships, and prompt commercial support.',
    },
    {
      title: 'Responsible Farming',
      description: 'Prioritizing animal welfare, biosecure poultry environments, and clean sanitation practices.',
    },
    {
      title: 'Customer Satisfaction',
      description: 'Attentive service tailored to households, small retailers, restaurants, and institutional buyers.',
    },
    {
      title: 'Continuous Improvement',
      description: 'Regularly evaluating farm workflows and customer feedback to advance our agribusiness standards.',
    },
  ] as ValueItem[],
  teamMembers: [
    {
      id: 'asare-kyei-daniel',
      name: 'Asare-Kyei Daniel',
      role: 'Founder & Board Director',
      category: 'Board of Directors',
      focusArea: 'Enterprise Strategy & Agribusiness Governance',
      initials: 'AD',
      summary:
        'As Founder of Adinkra Frontiers Ltd, Asare-Kyei Daniel has pioneered the company’s mission of expanding the frontiers of poultry agribusiness in Ghana. With a solid foundation in agribusiness entrepreneurship and commercial operations, he directs corporate vision, capital allocation, and long-term supply chain partnerships.',
    },
    {
      id: 'richard',
      name: 'Richard',
      role: 'Co-Founder & Board Director',
      category: 'Board of Directors',
      focusArea: 'Corporate Planning & Strategic Partnerships',
      initials: 'RC',
      summary:
        'As Co-Founder, Richard provides critical leadership in commercial structuring, enterprise development, and corporate governance. He works with executive leadership to drive sustainable business growth, risk oversight, and key institutional relationships across Ghana’s agricultural sector.',
    },
    {
      id: 'collins',
      name: 'Collins',
      role: 'Chief Executive Officer (CEO)',
      category: 'Management Team',
      focusArea: 'Executive Leadership & Daily Business Operations',
      initials: 'CO',
      summary:
        'As Chief Executive Officer, Collins spearheads executive administration, operational performance, and client fulfillment at Adinkra Frontiers Ltd. He ensures strict adherence to quality assurance standards, biosecurity protocols, and seamless farm-to-table delivery.',
    },
    {
      id: 'francis',
      name: 'Francis',
      role: 'Sales & Accounts Manager',
      category: 'Management Team',
      focusArea: 'Commercial Accounts & Client Logistics',
      initials: 'FR',
      summary:
        'Francis manages commercial sales accounts, institutional client partnerships, customer invoicing, and bulk order scheduling. He ensures dependable supply fulfillment for supermarkets, hotels, restaurants, bakeries, and retail partners.',
    },
    {
      id: 'frimpong',
      name: 'Frimpong',
      role: 'Farm Manager',
      category: 'Management Team',
      focusArea: 'Flock Husbandry, Biosecurity & Facility Management',
      initials: 'FP',
      summary:
        'Frimpong oversees farm production and daily operations at the Sanfo/Aduam facility. With dedicated expertise in poultry husbandry and biosecurity management, he supervises daily egg collection, sorting, flock nutrition, and on-site hygiene compliance.',
    },
  ] as TeamMember[],
};

export const AboutUs: React.FC = () => {
  const [teamFilter, setTeamFilter] = useState<'All' | 'Board of Directors' | 'Management Team'>('All');

  const filteredTeam =
    teamFilter === 'All'
      ? companyOverviewData.teamMembers
      : companyOverviewData.teamMembers.filter((m) => m.category === teamFilter);

  return (
    <section id="about" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#0738A6] uppercase">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B66] mt-2 tracking-tight">
            {companyOverviewData.title}
          </h2>
          <p className="text-base sm:text-lg text-[#172033]/80 mt-4 leading-relaxed font-normal">
            {companyOverviewData.overview}
          </p>
        </div>

        {/* Mission & Vision: Two Distinct Structural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-[#FFF8ED] rounded-2xl p-8 border border-[#F5A300]/25 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A300]/10 rounded-bl-full pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-white border border-[#F5A300]/40 flex items-center justify-center text-[#F5A300] mb-5 shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#082B66]">Our Mission</h3>
              <p className="text-[#172033]/85 mt-3 leading-relaxed text-base">
                {companyOverviewData.mission}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F5A300]/20 flex items-center gap-2 text-xs font-semibold text-[#0738A6]">
              <CheckCircle2 className="w-4 h-4 text-[#F5A300]" />
              <span>Disciplined Farm Management &amp; Customer Care</span>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-[#FFF8ED] rounded-2xl p-8 border border-[#0738A6]/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0738A6]/10 rounded-bl-full pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-white border border-[#0738A6]/30 flex items-center justify-center text-[#0738A6] mb-5 shadow-sm">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#082B66]">Our Vision</h3>
              <p className="text-[#172033]/85 mt-3 leading-relaxed text-base">
                {companyOverviewData.vision}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#0738A6]/15 flex items-center gap-2 text-xs font-semibold text-[#0738A6]">
              <Sparkles className="w-4 h-4 text-[#0738A6]" />
              <span>Expanding the Frontiers of Agribusiness</span>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-[#0738A6] uppercase">
              Core Principles
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#082B66] mt-1">
              Our Values
            </h3>
            <p className="text-sm text-[#172033]/70 mt-1 max-w-xl mx-auto">
              The fundamental standards guiding every aspect of our farm operations and client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyOverviewData.values.map((val, index) => (
              <div
                key={val.title}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:border-[#0738A6]/30 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono font-bold text-[#0738A6] bg-[#FFF8ED] px-2 py-1 rounded">
                    0{index + 1}
                  </span>
                  <h4 className="text-base font-bold text-[#082B66]">{val.title}</h4>
                </div>
                <p className="text-sm text-[#172033]/80 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members & Leadership Section with Dropdown View */}
        <div id="team" className="pt-12 border-t border-slate-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#0738A6] uppercase">
                Leadership &amp; Governance
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#082B66] mt-1 tracking-tight">
                Our Leadership &amp; Team Members
              </h3>
              <p className="text-sm text-[#172033]/80 mt-1 max-w-2xl">
                Experienced founders, board governance, and hands-on agricultural management driving quality, reliability, and growth.
              </p>
            </div>

            {/* Team Dropdown Filter Selector */}
            <div className="flex items-center gap-3 bg-[#FFF8ED] p-1.5 rounded-xl border border-[#0738A6]/15 self-start md:self-auto">
              <label htmlFor="team-category-dropdown" className="text-xs font-bold text-[#082B66] pl-2 flex items-center gap-1.5 whitespace-nowrap">
                <Users className="w-3.5 h-3.5 text-[#0738A6]" />
                <span className="hidden sm:inline">Select Group:</span>
              </label>

              <div className="relative">
                <select
                  id="team-category-dropdown"
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value as 'All' | 'Board of Directors' | 'Management Team')}
                  className="appearance-none bg-white text-[#082B66] font-bold text-xs sm:text-sm pl-3 pr-8 py-2 rounded-lg border border-[#0738A6]/20 focus:outline-none focus:ring-2 focus:ring-[#0738A6] cursor-pointer shadow-xs"
                >
                  <option value="All">All Team Members ({companyOverviewData.teamMembers.length})</option>
                  <option value="Board of Directors">Board of Directors (2)</option>
                  <option value="Management Team">Management Team (3)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#0738A6] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Quick Segment Buttons for Desktop Convenience */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {(['All', 'Board of Directors', 'Management Team'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setTeamFilter(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  teamFilter === cat
                    ? 'bg-[#0738A6] text-white shadow-sm'
                    : 'bg-white text-[#172033]/80 hover:text-[#0738A6] hover:bg-[#FFF8ED] border border-slate-200'
                }`}
              >
                {cat === 'All' ? 'All Team Members' : cat}
              </button>
            ))}
          </div>

          {/* Team Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeam.map((member) => {
              const isBoard = member.category === 'Board of Directors';
              return (
                <div
                  key={member.id}
                  className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between shadow-xs hover:shadow-md ${
                    isBoard
                      ? 'border-[#0738A6]/30 bg-gradient-to-b from-white to-[#FFF8ED]/30'
                      : 'border-slate-200 hover:border-[#0738A6]/30'
                  }`}
                >
                  <div>
                    {/* Header: Avatar / Initials & Category Badge */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-13 h-13 rounded-xl flex items-center justify-center font-bold text-base shadow-xs ${
                            isBoard
                              ? 'bg-[#0738A6] text-white'
                              : 'bg-[#FFF8ED] text-[#0738A6] border border-[#0738A6]/20'
                          }`}
                        >
                          {member.initials}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#082B66] leading-tight">
                            {member.name}
                          </h4>
                          <p className="text-xs font-semibold text-[#0738A6] mt-0.5">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Unboxed Metadata & Focus Area */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
                      {isBoard ? (
                        <Award className="w-3.5 h-3.5 text-[#F5A300] shrink-0" />
                      ) : member.role.includes('CEO') ? (
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0738A6] shrink-0" />
                      ) : (
                        <Briefcase className="w-3.5 h-3.5 text-[#0738A6] shrink-0" />
                      )}
                      <span className="font-medium text-[#082B66]">{member.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="line-clamp-1">{member.focusArea}</span>
                    </div>

                    {/* Professional Summary */}
                    <p className="text-xs sm:text-sm text-[#172033]/80 leading-relaxed font-normal">
                      {member.summary}
                    </p>
                  </div>

                  {/* Card Footer Tag */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Adinkra Frontiers Ltd</span>
                    <span className="text-[#0738A6] font-semibold">{isBoard ? 'Governance' : 'Operations'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

