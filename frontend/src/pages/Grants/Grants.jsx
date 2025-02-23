import React from 'react';
import { Box, Typography, Divider, Link, Chip, Grid, Paper } from '@mui/material';
const grants = [
  {
    name: 'Work Opportunity Tax Credit (WOTC)',
    type: 'Federal',
    description:
      'The Work Opportunity Tax Credit (WOTC) is a federal tax incentive program designed to encourage employers to hire individuals from specific target groups who have consistently faced significant barriers to employment. Employers can receive tax credits ranging from $1,200 to $9,600 per qualified employee, depending on the category of the hire. The program covers various groups including veterans, long-term unemployed individuals, ex-felons, individuals on government assistance programs like SNAP (Supplemental Nutrition Assistance Program) or TANF (Temporary Assistance for Needy Families), and residents of designated empowerment zones or rural renewal counties. The credit is calculated as 40% of the first $6,000 in qualified first-year wages for a maximum credit of $2,400 for most employee categories. Employees must work at least 120 hours to qualify for a partial credit of $1,500, and over 400 hours for the full $2,400 credit. The program has been extended until December 31, 2025, providing businesses with an ongoing opportunity to benefit from this tax incentive while supporting workforce diversity and inclusion[1][2].',
    eligibility:
      'Employers must hire individuals from specific target groups and obtain certification from their state workforce agency before claiming the credit. The employee must be a new hire and belong to one of the qualifying categories. Qualified individuals must complete at least 120 hours of work to qualify for the partial WOTC credit of $1,500, and over 400 hours for the full $2,400 credit[2].',
    link: 'https://www.dol.gov/agencies/eta/wotc',
    eligible: true
  },
  {
    name: 'Small Business Innovation Research (SBIR) Program',
    type: 'Federal',
    description:
      "The Small Business Innovation Research (SBIR) program is a highly competitive U.S. government funding program coordinated by the Small Business Administration. It's designed to support small businesses in conducting research and development (R&D) with the potential for commercialization. The program helps small businesses explore their technological potential and provides incentives to profit from innovation. SBIR operates in three phases: Phase I for concept development (usually 6 months and up to $250,000), Phase II for prototype development (usually 2 years and up to $1.5 million), and Phase III for commercialization (no SBIR funds). The program is funded by allocating a percentage of the total extramural R&D budgets of federal agencies with over $100 million in such budgets. Approximately $2.5 billion is awarded through this program annually, with the Department of Defense being the largest contributor at about $1 billion. The program has a strong focus on supporting small and diverse businesses, with over half the awards going to firms with fewer than 25 employees and a fifth to minority or women-owned businesses[1][3].",
    eligibility:
      'To qualify, businesses must be for-profit, have fewer than 500 employees, be at least 51% owned by U.S. citizens or permanent resident aliens, and the principal researcher must be primarily employed by the business[6].',
    link: 'https://www.sbir.gov/',
    eligible: false
  },
  {
    name: 'Small Business Technology Transfer (STTR) Program',
    type: 'Federal',
    description:
      'The Small Business Technology Transfer (STTR) program is similar to the SBIR program but with a unique requirement for small businesses to formally collaborate with nonprofit research institutions. This program aims to bridge the gap between basic science performance and the commercialization of resulting innovations. It expands funding opportunities in the federal innovation research and development arena, fostering partnerships between small businesses and nonprofit research institutions. The STTR program follows a structure similar to SBIR, with three phases of funding and development. This collaboration requirement ensures a more direct transfer of technology from research institutions to commercial applications, potentially accelerating the innovation process[4][6].',
    eligibility:
      'Eligibility criteria are similar to SBIR, with the additional requirement that the small business must partner with a nonprofit research institution for technology transfer. The small business must perform at least 40% of the work, and the research institution must perform at least 30%[6].',
    link: 'https://www.sbir.gov/about/about-sttr',
    eligible: false
  },
  {
    name: 'SBA 8(a) Business Development Program',
    type: 'Federal',
    description:
      'The 8(a) Business Development Program is an essential instrument for helping socially and economically disadvantaged entrepreneurs gain access to the economic mainstream of American society. It offers a broad scope of assistance to firms that are owned and controlled at least 51% by socially and economically disadvantaged individuals. The program provides business development support including mentoring, procurement assistance, business counseling, training, financial assistance, surety bonding, and other management and technical assistance. Participation is divided into two phases over nine years: a four-year developmental stage and a five-year transition stage. The program aims to graduate 8(a) firms that will thrive in a competitive business environment. Participants are required to maintain a balance between commercial and government business and are subject to limits on the total dollar value of sole-source contracts they can receive while in the program[5][7].',
    eligibility:
      'The business must be at least 51% owned and controlled by socially and economically disadvantaged individuals who are U.S. citizens. The firm must be a small business as defined by SBA standards and demonstrate potential for success. Owners must have a personal net worth of $850,000 or less, an adjusted gross income of $400,000 or less, and total assets not exceeding $6.5 million[7].',
    link: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program',
    eligible: true
  },
  {
    name: 'HUBZone Program',
    type: 'Federal',
    description:
      "The Historically Underutilized Business Zone (HUBZone) program, created in response to the HUBZone Empowerment Act of 1998, aims to promote economic development and employment growth in distressed areas by providing access to more federal contracting opportunities. This program helps small businesses in urban and rural communities gain preferential access to federal procurement opportunities. HUBZones are defined as historically under-utilized business zones and can include qualified census tracts, qualified non-metropolitan counties, lands within the external boundaries of an Indian reservation, qualified base closure areas, or redesignated areas. The program's primary goal is to encourage the U.S. federal government to contract with businesses that operate and create jobs in communities with proven economic needs. As of January 16, 2025, new rules will apply to existing contracts, including changes to employee work requirements and residency verification[6][8].",
    eligibility:
      'To be eligible, a business must: 1) Be a small business by SBA standards, 2) Be at least 51% owned and controlled by U.S. citizens, a Community Development Corporation, an agricultural cooperative, or an Indian tribe, 3) Have its principal office located in a HUBZone, and 4) Have at least 35% of its employees residing in a HUBZone. The new rule will require an individual to work at least 10 hours per week, as opposed to 40 hours per month, during the four-week period preceding the date of certification[8].',
    link: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program',
    eligible: true
  },
  {
    name: 'Minority Business Development Agency (MBDA) Grants',
    type: 'Federal',
    description:
      "The Minority Business Development Agency (MBDA) provides federal assistance to support innovative projects that promote and address challenges faced by minority enterprises. For 2025, MBDA has announced approximately $11 million in federal funding available through three new technical assistance programs. These programs include the Women's Business Center Program ($2 million), Rural Business Center Program ($4 million), and Entrepreneurship Education Program for Formerly Incarcerated Persons ($5 million). The MBDA Business Center Program offers technical assistance and business development services to minority business enterprises (MBEs). These centers, funded through cooperative agreements, provide services such as access to capital, access to contracts, business consulting, and exporting assistance. The program aims to foster, promote, and develop minority business enterprises through grants, contracts, and other agreements with public or private organizations[7][9].",
    eligibility:
      'Eligible applicants include for-profit entities, non-profit organizations, state and local governments, Indian tribes, and educational institutions. The focus is on organizations that can provide services to minority-owned businesses[9].',
    link: 'https://www.mbda.gov/grant-competitions',
    eligible: false
  },
  {
    name: 'Women-Owned Small Business (WOSB) Federal Contracting Program',
    type: 'Federal',
    description:
      "The Women-Owned Small Business (WOSB) Federal Contracting Program, which became effective in SBA's regulations on February 4, 2011, aims to provide equal access to federal contracting opportunities for WOSBs and economically disadvantaged women-owned small businesses (EDWOSBs). This program allows contracting officers to set aside specific federal contracts for certified WOSBs and EDWOSBs, thereby helping to achieve the federal government's goal of awarding 5% of federal contracting dollars to WOSBs. The program covers a wide range of industries where women-owned small businesses are underrepresented in federal contracting. In 2020, SBA implemented changes to the certification process, requiring all WOSB firms to apply for certification through SBA's free online certification process or through SBA-approved Third-Party Certifiers. Participants must annually attest to meeting program requirements and undergo a program examination every three years[10].",
    eligibility:
      'To be eligible, a business must: 1) Be a small business according to SBA size standards, 2) Be at least 51% owned and controlled by women who are U.S. citizens, 3) Have women manage day-to-day operations and make long-term decisions. For EDWOSBs, additional economic criteria apply, including personal net worth less than $850,000, adjusted gross income of $400,000 or less, and personal assets of $6.5 million or less[10].',
    link: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contracting-program',
    eligible: true
  },
  {
    name: 'Massachusetts HireNow Program',
    type: 'State (Massachusetts)',
    description:
      'The Massachusetts HireNow Program is a state initiative designed to address workforce shortages and support economic recovery. This program provides funding to Massachusetts employers who hire and retain new employees. Employers can receive up to $400,000 for 100 eligible newly hired employees, with grant funds being awarded at a flat rate of $4,000 per eligible hire. The program aims to encourage businesses to expand their workforce, particularly in industries that have been significantly impacted by the COVID-19 pandemic. Employers can use the funds flexibly to increase on-the-job training. The program was created in response to the hiring challenges experienced by Massachusetts employers due to the COVID-19 pandemic and is funded by the American Rescue Plan Act of 2021[11].',
    eligibility:
      'Eligible employers must be for-profit or non-profit Massachusetts employers in good standing with the Commonwealth, up-to-date on all obligations to the Massachusetts department of unemployment assistance and Massachusetts Department of Revenue, and have a physical location in Massachusetts. Eligible new hires must be scheduled to work a minimum of 30 hours weekly on an ongoing basis, earn between specified minimum and maximum wage guidelines, be payroll employees (W2), Massachusetts residents working in Massachusetts, and be hired between March 23, 2022 and December 31, 2022, and retained for a minimum of 60 days[11].',
    link: 'https://www.mass.gov/service-details/hirenow-program',
    eligible: true
  },
  {
    name: 'Rural Economic Development Loan and Grant Program (REDLG)',
    type: 'Federal',
    description:
      'The Rural Economic Development Loan and Grant Program (REDLG) is designed to promote rural economic development and job creation projects. REDLG provides funding to rural projects through local utility organizations. The program offers both loans and grants. Grants of up to $300,000 are available, while loans can reach up to $2,000,000. However, for the second, third, and fourth quarter application periods of fiscal year 2025, the maximum amount per award has been reduced to $1,000,000. Up to 10% of grant funds may be applied toward operating expenses over the life of a revolving loan fund. Eligible projects include facilities and equipment for medical care to rural residents, start-up venture costs, business expansion, technical assistance, business incubators, community development assistance, and facilities and equipment for education and training for rural residents to facilitate economic development[12].',
    eligibility:
      'Eligible applicants include any former Rural Utilities Service borrower who borrowed, repaid or pre-paid an insured, direct, or guaranteed loan, nonprofit utilities that are eligible to receive assistance from the Rural Development Electric or Telecommunication Programs, and current Rural Development Electric or Telecommunication Programs borrowers[12].',
    link: 'https://www.rd.usda.gov/programs-services/business-programs/rural-economic-development-loan-grant-program',
    eligible: false
  },
  {
    name: 'R&D Tax Credit',
    type: 'Federal',
    description:
      "The Research and Development (R&D) Tax Credit is a general business tax credit under Internal Revenue Code section 41 for companies that incur R&D costs in the United States. This credit is designed to encourage innovation and technological advancement in the private sector. It provides a credit for qualified research expenses and basic research payments to eligible businesses. The credit can be particularly beneficial for small businesses and startups engaged in developing new or improved products, processes, or software. To qualify for the R&D tax credit, a taxpayer must be engaged in 'qualified research' that meets a four-part test: 1) Section 174 test (expenditures must be eligible for a §174 deduction), 2) Technological information test (research must be technological in nature), 3) Process of experimentation test (activities must be part of a process of experimentation), and 4) Business component test (research must relate to a new or improved business component). The credit amount varies based on the nature and extent of the research activities[13].",
    eligibility:
      "Businesses of all sizes may be eligible if they design, develop, or improve products, processes, techniques, formulas, or software. Startups and small businesses may be able to apply the credit against their payroll taxes. Eligibility is determined on a case-by-case basis, considering factors such as the nature of the research, the taxpayer's involvement in a trade or business, and the specific expenditures incurred[13].",
    link: 'https://www.irs.gov/businesses/research-credit',
    eligible: true
  }
];

const Grants = () => {
  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', p: 4, backgroundColor: '#f9f9f9', borderRadius: 3 }}>
      <Typography variant="h3" gutterBottom align="center" color="primary" sx={{ fontWeight: 'bold' }}>
        Small Business Hiring Grants
      </Typography>
      <Typography variant="h6" align="center" paragraph>
        Discover various federal grant programs that provide financial assistance to small businesses hiring new employees.
      </Typography>
      {grants.map((grant, index) => (
        <Paper key={index} sx={{ p: 3, mb: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography variant="h4" color="secondary" sx={{ fontWeight: 'bold' }}>
              {grant.name}
            </Typography>
            <Chip
              label={grant.eligible ? 'Eligible' : 'Not Eligible'}
              color={grant.eligible ? 'success' : 'error'}
              sx={{ fontSize: '1rem', fontWeight: 'bold' }}
            />
          </Grid>
          <Typography variant="h5" paragraph>
            <strong>Type:</strong> {grant.type}
          </Typography>
          <Typography variant="body1" paragraph>
            {grant.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            <strong>Eligibility:</strong> {grant.eligibility}
          </Typography>
          <Link href={grant.link} target="_blank" rel="noopener noreferrer" color="primary" sx={{ fontSize: '1.1rem' }}>
            Learn More
          </Link>
          {index !== grants.length - 1 && <Divider sx={{ mt: 3 }} />}
        </Paper>
      ))}
    </Box>
  );
};

export default Grants;
