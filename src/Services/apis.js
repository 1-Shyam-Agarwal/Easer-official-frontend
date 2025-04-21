const BASE_URL = "easer-official-backend-production.up.railway.app/api/v1"


// AUTH ENDPOINTS
export const authEndpoints = {
  RESETPASSTOKEN_API: BASE_URL+"/reset-password-token",
  RESETPASSWORD_API: BASE_URL+"/reset-password",
  SIGNUP_API : BASE_URL+"/signup",
  OTP_API : BASE_URL+"/send-otp",
  VERIFY_OTP_API : BASE_URL+"/otp-verification",
  LOGIN_API : BASE_URL+"/login",
  CREATE_ACCOUNT_API : BASE_URL+"/create-account",
  VALIDATE_VENDOR_INFO : BASE_URL+"/validate-vendor-info",
  CREATE_VENDOR_ACCOUNT_API : BASE_URL+"/create-vendor-account",
  GOOGLE_SIGNUP_INFO_EXTRACTION : BASE_URL + "/google-signup-information-extraction",
  GOOGLE_SIGNUP : BASE_URL + "/google-signup",
  EMAIL_VALIDATION_AT_LOGIN : BASE_URL + "/email-validation-at-login"
}

export const getInTouchEndpoints = {
  GETINTOUCH_API : BASE_URL+"/get-in-touch",
}

export const addCollegeEndpoints = {
  ADD_COLLEGE_VALIDATION_API : BASE_URL+"/add-college-validation",
  CREATE_ADD_COLLEGE_API : BASE_URL+"/create-add-college",
  GET_ADD_COLLEGES : BASE_URL+"/get-all-add-colleges",
  
}

export const collegeDetailsEndpoints = {
  GET_ALL_COLLEGE_DETAILS : BASE_URL+"/get-all-colleges",
}


export const getVendorEndpoints = {
  GET_FILTERED_VENDORS : BASE_URL+"/get-filtered-vendors",
  GET_FILTERED_VENDORS_WITH_MINIMUM_DETAILS : BASE_URL+"/get-filtered-vendors-with-minimum-details"
}

export const printOrderVendorEndpoints = {
  VALIDATE_PRINT_ORDER_VENDOR : BASE_URL+"/validate-print-order-vendor",
  VALIDATE_FILE_FORMAT_AND_SIZE_AND_UPLOAD : BASE_URL+"/validate-file-format-and-size-and-upload",
  GET_VENDOR_PRICE_DETAILS_AND_FINAL_AMOUNT : BASE_URL+"/get-all-vendor-price-details-and-final-amount",
  VALIDATE_ORDER : BASE_URL+"/validate-order",
  CREATE_ORDER : BASE_URL+"/create-order",
  CREATE_PG_ORDER:BASE_URL+"/create-pg-order",
  VERIFY_PAYMENT:BASE_URL+"/verify-payment",
  DELETE_DOCUMENT:BASE_URL+"/delete-document",
  CANCEL_DOCUMENT:BASE_URL+"/cancel-document"
}

export const resetEndpoints = {
  VALIDATE_AND_UPDATE_NAME : BASE_URL+"/validate-and-update-name",
  VALIDATE_AND_UPDATE_PASSWORD : BASE_URL+"/validate-and-update-password",
  UPDATE_DISPLAY_PICTURE_API : BASE_URL+"/reset-profile-image",
  UPDATE_MOBILE_NUMBER:BASE_URL+"/update-mobile-number",
  UPDATE_SHOP_DETAILS:BASE_URL+"/update-shop-details",
  UPDATE_FINE_DETAILS:BASE_URL+"/update-fine-details",
  UPDATE_WAITING_TIME:BASE_URL+"/update-waiting-time",
  ALTER_SHOP_STATUS : BASE_URL+"/alter-shop-status",
  ALTER_REFUND_STATUS : BASE_URL+"/alter-refund-status"
}

export const getOrdersEndpoints = {
  GET_VENDOR_ORDERS : BASE_URL+"/get-all-orders-of_vendor" ,
  GET_ALL_CANCELLED_ORDERS : BASE_URL+"/get-all-cancelled-orders",
  GET_ALL_SPECIFIC_USER_ONGOING_ORDERS: BASE_URL+"/get-all-specific-user-on-going-orders",
  GET_ALL_SPECIFIC_UNRECEIVED_ORDERS: BASE_URL+"/get-all-specific-unreceived-orders",
  GET_SPECIFIC_ORDER_HISTORY : BASE_URL+"/fetch-order-history"
}

export const cancellationEndpoints={
  SET_CANCELLATION_INDICATORS : BASE_URL+"/set-cancellation-indicators",
  DESET_CANCELLATION_INDICATORS :BASE_URL+"/deset-cancellation-indicators",
  ORDER_CANCELLATION:BASE_URL+"/order-cancellation"
}


export const orderOperationsEndpoints = {
  SET_NOTIFY_CUSTOMER_INDICATOR : BASE_URL+"/set-notify-customer-indicator",
  SEND_MESSAGE_TO_CUSTOMER : BASE_URL+"/send-message-to-customer",
  SET_PROCESS_ORDER_INDICATOR : BASE_URL+"/set-process-order-indicator",
  DESET_PROCESS_ORDER_INDICATOR : BASE_URL+"/deset-process-indicator",
  COMPLETE_USER_ORDER : BASE_URL+"/complete-user-order",
  RECEIVE_USER_ORDER : BASE_URL+"/order-history-creator"
}

export const getUserInformationEndpoints = {
  GET_USER_DETAILS : BASE_URL+"/get-user-information",
  GET_USER_ROLE :BASE_URL+"/get-user-role",
  GET_SHOP_STATUS : BASE_URL+"/get-shop-status",
  GET_USER_ID : BASE_URL+"/get-user-id",
  GET_ROOMS_FOR_USER : BASE_URL+"/get-rooms-for-users",
  GET_SHOP_INFORMATION : BASE_URL + "/get-shop-information"
}

