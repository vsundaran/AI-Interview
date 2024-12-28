import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DifficultGraph from '../elements/difficulty-graph/difficulty-graph';
import QuestionsAnswerMarks from '../elements/question-answer-marks/question-answer-marks';
import EyeContactChart from '../elements/eye-contact/eye-contact';
import PerformanceChart from '../elements/performance/performance';
import OverAllMarks from '../elements/overall-marks/overall-marks';
import AIFeedBack from '../elements/feedback/feedback';
const Dashboard = () => {
    return (
        <Grid container spacing={{ md: 2 }}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                <Grid container spacing={{ xs: 2 }}>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <Box display={"flex"} flexDirection={"column"} gap={3}>
                            <DifficultGraph />
                            <DifficultGraph />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <QuestionsAnswerMarks />
                    </Grid>
                </Grid>
                <Box marginTop={2} marginBottom={3}>
                    <DifficultGraph />
                </Box>
            </Grid>

            {/* Right */}
            <Grid spacing={{ xs: 2 }} size={{ xs: 12, sm: 12, md: 6 }}>
                <Grid container spacing={{ xs: 2 }}>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                        <EyeContactChart />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                        <Box>
                            <OverAllMarks />
                        </Box>
                    </Grid>
                </Grid>
                <Box marginTop={2} marginBottom={3}>
                    <PerformanceChart />
                </Box>
                <Box marginTop={2} marginBottom={3}>
                    <AIFeedBack />
                </Box>
            </Grid>
        </Grid>
    )
};

export default Dashboard;
