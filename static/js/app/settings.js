//noinspection JSAnnotator
/**
 * File containing global settings for exercises
 * */

export default {
    /*********************** Exercise API Parameters **************************/

    ZEEGUU_API: 'https://zeeguu.unibe.ch/api',
    ZEEGUU_SESSION_ID: 'sessionID',
    ZEEGUU_DEFAULT_COOKIE_EXPIRATION: 21, //days
    ZEEGUU_DEFAULT_SESSION: '00926044',//00926044 34563456 11010001

    /******************** Exercise Bookmark Parameters ************************/
    ZEEGUU_STUDY_BOOKMARKS: '/bookmarks_to_study/',

    /*********************** Exercise Outcome Parameters **************************/

    /** Current endpoint for submitting the result*/
    ZEEGUU_EX_OUTCOME_ENDPOINT: '/report_exercise_outcome',

    /** Source types for exercise outcome */
    ZEEGUU_EX_SOURCE_RECOGNIZE: '/Recognize',

    /** Outcome types for exercise */
    ZEEGUU_EX_OUTCOME_CORRECT: '/Correct',
	ZEEGUU_EX_OUTCOME_WRONG: '/Wrong',
	ZEEGUU_EX_OUTCOME_HINT: '/asked_for_hint',

    /** Ex settings*/
    EX1_MIN_SIZE: 1,
    EX2_MIN_SIZE: 3,
    EX3_MIN_SIZE: 3,
    EX4_MIN_SIZE: 1,

};