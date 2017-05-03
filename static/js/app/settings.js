/**
 * File containing global settings for exercises
 * */

export default {
    /*********************** Exercise API Parameters **************************/

    ZEEGUU_API: 'https://www.zeeguu.unibe.ch/api',
    ZEEGUU_SESSION: 'sessionID',

    /*********************** Exercise Outcome Parameters **************************/

    /** Current endpoint for submitting the result*/
    ZEEGUU_EX_OUTCOME_ENDPOINT: '/report_exercise_outcome',

    /** Source types for exercise outcome */
    ZEEGUU_EX_SOURCE_RECOGNIZE: "/Recognize",

    /** Outcome types for exercise */
    ZEEGUU_EX_OUTCOME_CORRECT: "/Correct",
	ZEEGUU_EX_OUTCOME_WRONG: "/Wrong",
	ZEEGUU_EX_OUTCOME_HINT: "/asked_for_hint",

};