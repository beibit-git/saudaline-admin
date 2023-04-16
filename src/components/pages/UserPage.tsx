import { Row, Col, Typography, Calendar, Card, Collapse } from 'antd';
import useWindowDimensions from '../../hooks/useWindowDimensions/useWindowDimensions';
import windowBreakpointWidth from '../../helpers/windowBreakpointWidth';
import PageWrapper from '../../ui/PageWrapper';

const UserPage = () => {
  const data = [
    {
      title: 'DU Tech Support',
      mail: ['support_du@astanait.edu.kz'],
    },
    {
      title: 'Military department',
      mail: ['alexei.peresipkin@astanait.edu.kz'],
      phone: ['+7 (701) 412-87-58'],
      room: ['C1.3.336'],
    },
    {
      title: 'Request for Transcript',
      mail: ['transcript@astanait.edu.kz'],
    },
    {
      title: 'Медпункт ',
      phone: ['8 (7172) 64-57-33'],
    },
    {
      title: "Department of the students' affairs (Clubs, Volunteers, Dormitory, Lockers) ",
      mail: ['arman.kenzhebekov@astanait.edu.kz'],
      room: ['C1.1.323'],
    },
    {
      title: 'Change password (Moodle, Microsoft products), SEB configurations',
      mail: ['helpdesk@astanait.edu.kz'],
      room: ['C1.2.255'],
    },
    {
      title: 'Change password (Platonus)',
      mail: ['ainur.bakenova@astanait.edu.kz', 'ainagul.smagulova@astanait.edu.kz'],
      room: ['C1.1.273'],
    },
    {
      title: "Head of the Registrar's office (FX, Retake, Schedule)",
      mail: ['aliya.koitanova@astanait.edu.kz'],
      room: ['C1.1.270'],
    },
    {
      title: 'Head of the Students Department',
      mail: ['madina.mukaliyeva@astanait.edu.kz'],
      room: ['C1.1.273'],
    },
    {
      title: 'SOS ( · · · - - - · · · ), Mayday, Houston',
      mail: ['deans_office@astanait.edu.kz'],
      room: ['C1.1.320'],
    },
    {
      title: 'Olzhas Turar - Department of Computer Technology and Data',
      room: ['C1.1.321'],
    },
    {
      title: 'Assel Smaiyl- Computer Engineering Department',
      room: ['C1.3.359'],
    },
    {
      title: 'Zhibek Tleshova- Department of Social Sciences',
      room: ['C1.1.263'],
    },
    {
      title: 'Baurzhan Ilyassov - Department of Intelligent Systems and Cybersecurity',
      room: ['C1.1.330'],
    },
  ];

  const { width } = useWindowDimensions();

  return (
    <Row>
      <Col xl={18} xs={24}>
        <PageWrapper>
          {/* <Typography.Title level={3}>Announcements</Typography.Title>
          <NewsCarousel /> */}
          <Typography.Title level={3}>Calendar</Typography.Title>
          <Calendar fullscreen={width > windowBreakpointWidth.xl} />
        </PageWrapper>
      </Col>
      <Col xl={6} xs={24}>
        <Card
          style={{
            height: '100%',
            minHeight: 360,
          }}
        >
          <Collapse expandIconPosition="right" bordered={false} defaultActiveKey={1}>
            <Collapse.Panel
              header={<Typography.Title level={3}>Contacts</Typography.Title>}
              key="1"
              style={{ borderBottom: 'none', borderRadius: 15 }}
            >
              {/* <ContactsList list={data} /> */}
            </Collapse.Panel>
          </Collapse>
          {/* <AuthenticatedContent role={'STUDENTS'}>
            <Typography.Title level={3} style={{ marginTop: '20px' }}>
              Attendance
            </Typography.Title>
            <Row gutter={16}>
              <AttendanceBox />
            </Row>
            <Typography.Title level={3} style={{ marginTop: '20px' }}>
              Book a Psychologist
            </Typography.Title>
            <BookingModal />
          </AuthenticatedContent> */}
          {/* <AuthenticatedContent role={'TEACHERS'}>
            <Typography.Title level={3}>Courses</Typography.Title>
            <Row gutter={16}>
              <CoursesBox></CoursesBox>
            </Row> 
          </AuthenticatedContent> */}
        </Card>
      </Col>
    </Row>
  );
};

export default UserPage;
