import { Row, Col, Typography, Calendar, Card, Collapse } from 'antd';
import useWindowDimensions from '../../hooks/useWindowDimensions/useWindowDimensions';
import windowBreakpointWidth from '../../helpers/windowBreakpointWidth';
import PageWrapper from '../../ui/PageWrapper';

const UserPage = () => {
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
