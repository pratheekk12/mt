import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { TextField, RadioGroup } from 'formik-material-ui';
import { useEffect } from 'react';
import {
  UPDATE_CALL_STATUS,
  UPDATE_CURRENT_STATUS,
  GET_INTERACTION_BY_DISTRIBUTOR_ID,
  GET_INTERACTION_BY_CALLER_NUMBER
} from 'src/modules/dashboard-360/utils/endpoints';
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio, Checkbox, Typography
} from '@material-ui/core';
import * as yup from 'yup';
import { Autocomplete } from '@material-ui/lab';
import { Category } from '@material-ui/icons';
const axios = require('axios');
const useStyle = makeStyles(() => ({
  fieldContainer: {
    width: '100%'
  }
}));
export default function DispositionForm(props) {
  const [disable, setDisable] = useState(true)
  const [takebreak, setTakebreak] = useState(false)
  var APIENDPOINT = 'http://192.168.3.36:62002';
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const onChangeTakebreak = (e) => setTakebreak(!takebreak)

  useEffect(() => {
    if (localStorage.getItem('callStatus') === 'AgentComplete') {
      setDisable(false)
    }
  }, [props])

  function addToQueue(agentId, queue) {
    var axios = require('axios');
    var data = JSON.stringify({
      agentId: agentId,
      queue: queue,
      action: 'QueueAdd'
    });

    var config = {
      method: 'get',
      url:
        APIENDPOINT +
        '/ami/actions/addq?Interface=' + agentId + '&Queue=' +
        queue +
        '',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then(function (response) { })
      .catch(function (error) {
        console.log(error);
      });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// addToQueue end //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// removeFromQueue start //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function removeFromQueue(agentId, queue) {
    var axios = require('axios');
    // console.log('remove', agentId)
    var data = JSON.stringify({
      agentId: agentId,
      queue: queue,
      action: 'QueueRemove'
    });

    var config = {
      method: 'get',
      url:
        APIENDPOINT +
        '/ami/actions/rmq?Queue=' +
        queue +
        '&Interface=' + agentId + '',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// removeFromQueue end //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const [initialValue, setInitialValue] = useState({
    CallerName: '',
    callermobilenumber: '',
    callerapplication: '',
    subcategory: '',
    category: '',
    secsubcategory: '',
    seccategory: '',
    comments: '',
    type: '',
    issuetype: ''
  });
  const classes = useStyle();
  const formRef = useRef({});
  const agentServiceURL = 'http://164.52.205.10:42004/';

  const [issuetypes, setissuetypes] = useState([
    {
      "issuetype": "complaint"
    },
    {
      "issuetype": "Request"
    },
    {
      "issuetype": "Enquiry"
    }
  ]);
  const [categories, setCategories] = useState([
    {
      "_id": "6019329a4d1d476d4ee4707c",
      "category": "Tapstart",
      "createdAt": "2021-02-02T11:08:10.879Z",
      "updatedAt": "2021-02-02T11:08:10.879Z",
      "__v": 0
    },
    {
      "_id": "601947384d1d476d4ee4714c",
      "category": "InCred",
      "createdAt": "2021-02-02T12:36:08.951Z",
      "updatedAt": "2021-02-02T12:36:08.951Z",
      "__v": 0
    }
  ]);
  const [seccategories, setSecCategories] = useState([
    {
      "_id": "601933b74d1d476d4ee47085",
      "categoryid": "6019329a4d1d476d4ee4707c",
      "secCategory": "Application Status",
      "createdAt": "2021-02-02T11:12:55.201Z",
      "updatedAt": "2021-02-02T11:12:55.201Z",
      "__v": 0
    },
    {
      "_id": "601933ca4d1d476d4ee47086",
      "categoryid": "6019329a4d1d476d4ee4707c",
      "secCategory": "Product/General queries",
      "createdAt": "2021-02-02T11:13:14.304Z",
      "updatedAt": "2021-02-02T11:13:14.304Z",
      "__v": 0
    },
    {
      "_id": "601933d74d1d476d4ee47087",
      "categoryid": "6019329a4d1d476d4ee4707c",
      "secCategory": "Not Interested (Before Line)",
      "createdAt": "2021-02-02T11:13:27.814Z",
      "updatedAt": "2021-02-02T11:13:27.814Z",
      "__v": 0
    },
    {
      "_id": "601933e74d1d476d4ee47088",
      "categoryid": "6019329a4d1d476d4ee4707c",
      "secCategory": "Login issue",
      "createdAt": "2021-02-02T11:13:43.140Z",
      "updatedAt": "2021-02-02T11:13:43.140Z",
      "__v": 0
    },
    {
      "_id": "601933f44d1d476d4ee47089",
      "categoryid": "6019329a4d1d476d4ee4707c",
      "secCategory": "Re-apply(more than 45 days old case)",
      "createdAt": "2021-02-02T11:13:56.707Z",
      "updatedAt": "2021-02-02T11:13:56.707Z",
      "__v": 0
    },
    {
      "_id": "601934014d1d476d4ee4708a",
      "categoryid": "6019329a4d1d476d4ee4707c",
      "secCategory": "Update details",
      "createdAt": "2021-02-02T11:14:09.828Z",
      "updatedAt": "2021-02-02T11:14:09.828Z",
      "__v": 0
    },
    {
      "_id": "6019340f4d1d476d4ee4708b",
      "categoryid": "6019329a4d1d476d4ee4707c",
      "secCategory": "Post Approval",
      "createdAt": "2021-02-02T11:14:23.328Z",
      "updatedAt": "2021-02-02T11:14:23.328Z",
      "__v": 0
    }
  ]);
  const [finalsubCategories, setfinalsubCategories] = useState([])
  const [subCategories, setSubCategories] = useState([
    {
      "_id": "601934e94d1d476d4ee4708d",
      "secCategoryid": "601933b74d1d476d4ee47085",
      "subCategory": "AIP",
      "createdAt": "2021-02-02T11:18:01.592Z",
      "updatedAt": "2021-02-02T11:18:01.592Z",
      "__v": 0
    },
    {
      "_id": "6019351b4d1d476d4ee4708e",
      "secCategoryid": "601933b74d1d476d4ee47085",
      "subCategory": "KYC",
      "createdAt": "2021-02-02T11:18:51.517Z",
      "updatedAt": "2021-02-02T11:18:51.517Z",
      "__v": 0
    },
    {
      "_id": "601935254d1d476d4ee4708f",
      "secCategoryid": "601933b74d1d476d4ee47085",
      "subCategory": "Tele PD",
      "createdAt": "2021-02-02T11:19:01.264Z",
      "updatedAt": "2021-02-02T11:19:01.264Z",
      "__v": 0
    },
    {
      "_id": "6019352f4d1d476d4ee47090",
      "secCategoryid": "601933b74d1d476d4ee47085",
      "subCategory": "Soft Approval",
      "createdAt": "2021-02-02T11:19:11.249Z",
      "updatedAt": "2021-02-02T11:19:11.249Z",
      "__v": 0
    },
    {
      "_id": "601935394d1d476d4ee47091",
      "secCategoryid": "601933b74d1d476d4ee47085",
      "subCategory": "e-mandate",
      "createdAt": "2021-02-02T11:19:21.130Z",
      "updatedAt": "2021-02-02T11:19:21.130Z",
      "__v": 0
    },
    {
      "_id": "6019355b4d1d476d4ee47092",
      "secCategoryid": "601933b74d1d476d4ee47085",
      "subCategory": "e-sign/m-otp",
      "createdAt": "2021-02-02T11:19:55.175Z",
      "updatedAt": "2021-02-02T11:19:55.175Z",
      "__v": 0
    },
    {
      "_id": "601935664d1d476d4ee47093",
      "secCategoryid": "601933b74d1d476d4ee47085",
      "subCategory": "Fulfillment",
      "createdAt": "2021-02-02T11:20:06.780Z",
      "updatedAt": "2021-02-02T11:20:06.780Z",
      "__v": 0
    },
    {
      "_id": "601935704d1d476d4ee47094",
      "secCategoryid": "601933b74d1d476d4ee47085",
      "subCategory": "MT Credit",
      "createdAt": "2021-02-02T11:20:16.517Z",
      "updatedAt": "2021-02-02T11:20:16.517Z",
      "__v": 0
    },
    {
      "_id": "6019357f4d1d476d4ee47095",
      "secCategoryid": "601933b74d1d476d4ee47085",
      "subCategory": "Ops Pending",
      "createdAt": "2021-02-02T11:20:31.628Z",
      "updatedAt": "2021-02-02T11:20:31.628Z",
      "__v": 0
    },
    {
      "_id": "601935a04d1d476d4ee47096",
      "secCategoryid": "601933ca4d1d476d4ee47086",
      "subCategory": "Interest Rate",
      "createdAt": "2021-02-02T11:21:04.604Z",
      "updatedAt": "2021-02-02T11:21:04.604Z",
      "__v": 0
    },
    {
      "_id": "601935ab4d1d476d4ee47097",
      "secCategoryid": "601933ca4d1d476d4ee47086",
      "subCategory": "Processing fee",
      "createdAt": "2021-02-02T11:21:15.122Z",
      "updatedAt": "2021-02-02T11:21:15.122Z",
      "__v": 0
    },
    {
      "_id": "601935b44d1d476d4ee47098",
      "secCategoryid": "601933ca4d1d476d4ee47086",
      "subCategory": "KYC/Documents required",
      "createdAt": "2021-02-02T11:21:24.932Z",
      "updatedAt": "2021-02-02T11:21:24.932Z",
      "__v": 0
    },
    {
      "_id": "601935c04d1d476d4ee47099",
      "secCategoryid": "601933ca4d1d476d4ee47086",
      "subCategory": "Line setup charge/Annual Charges",
      "createdAt": "2021-02-02T11:21:36.153Z",
      "updatedAt": "2021-02-02T11:21:36.153Z",
      "__v": 0
    },
    {
      "_id": "601935cb4d1d476d4ee4709a",
      "secCategoryid": "601933ca4d1d476d4ee47086",
      "subCategory": "Other charges",
      "createdAt": "2021-02-02T11:21:47.348Z",
      "updatedAt": "2021-02-02T11:21:47.348Z",
      "__v": 0
    },
    {
      "_id": "601935d44d1d476d4ee4709b",
      "secCategoryid": "601933ca4d1d476d4ee47086",
      "subCategory": "Tenure",
      "createdAt": "2021-02-02T11:21:56.582Z",
      "updatedAt": "2021-02-02T11:21:56.582Z",
      "__v": 0
    },
    {
      "_id": "601935dc4d1d476d4ee4709c",
      "secCategoryid": "601933ca4d1d476d4ee47086",
      "subCategory": "Product Features",
      "createdAt": "2021-02-02T11:22:04.810Z",
      "updatedAt": "2021-02-02T11:22:04.810Z",
      "__v": 0
    },
    {
      "_id": "601935e64d1d476d4ee4709d",
      "secCategoryid": "601933ca4d1d476d4ee47086",
      "subCategory": "Credit Limit",
      "createdAt": "2021-02-02T11:22:14.700Z",
      "updatedAt": "2021-02-02T11:22:14.700Z",
      "__v": 0
    },
    {
      "_id": "601935f44d1d476d4ee4709e",
      "secCategoryid": "601933ca4d1d476d4ee47086",
      "subCategory": "Limit Increase",
      "createdAt": "2021-02-02T11:22:28.310Z",
      "updatedAt": "2021-02-02T11:22:28.310Z",
      "__v": 0
    },
    {
      "_id": "601936184d1d476d4ee4709f",
      "secCategoryid": "601933d74d1d476d4ee47087",
      "subCategory": "Amount",
      "createdAt": "2021-02-02T11:23:04.642Z",
      "updatedAt": "2021-02-02T11:23:04.642Z",
      "__v": 0
    },
    {
      "_id": "601936214d1d476d4ee470a0",
      "secCategoryid": "601933d74d1d476d4ee47087",
      "subCategory": "Interest Rate",
      "createdAt": "2021-02-02T11:23:13.853Z",
      "updatedAt": "2021-02-02T11:23:13.853Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933d74d1d476d4ee47087",
      "subCategory": "Wants credit card",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "601936384d1d476d4ee470a2",
      "secCategoryid": "601933d74d1d476d4ee47087",
      "subCategory": "Wants Higher limit",
      "createdAt": "2021-02-02T11:23:36.013Z",
      "updatedAt": "2021-02-02T11:23:36.013Z",
      "__v": 0
    },
    {
      "_id": "6019364a4d1d476d4ee470a3",
      "secCategoryid": "601933d74d1d476d4ee47087",
      "subCategory": "Received loan from other source/ No requirement",
      "createdAt": "2021-02-02T11:23:54.991Z",
      "updatedAt": "2021-02-02T11:23:54.991Z",
      "__v": 0
    },
    {
      "_id": "601936594d1d476d4ee470a4",
      "secCategoryid": "601933d74d1d476d4ee47087",
      "subCategory": "Higher TAT",
      "createdAt": "2021-02-02T11:24:09.661Z",
      "updatedAt": "2021-02-02T11:24:09.661Z",
      "__v": 0
    },
    {
      "_id": "601936654d1d476d4ee470a5",
      "secCategoryid": "601933d74d1d476d4ee47087",
      "subCategory": "Line set up fee",
      "createdAt": "2021-02-02T11:24:21.599Z",
      "updatedAt": "2021-02-02T11:24:21.599Z",
      "__v": 0
    },
    // {
    //   "_id": "601936944d1d476d4ee470a6",
    //   "secCategoryid": "601933e74d1d476d4ee47088",
    //   "subCategory": "Line set up fee",
    //   "createdAt": "2021-02-02T11:25:08.984Z",
    //   "updatedAt": "2021-02-02T11:25:08.984Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "6019369d4d1d476d4ee470a7",
    //   "secCategoryid": "601933f44d1d476d4ee47089",
    //   "subCategory": "Line set up fee",
    //   "createdAt": "2021-02-02T11:25:17.474Z",
    //   "updatedAt": "2021-02-02T11:25:17.474Z",
    //   "__v": 0
    // },
    {
      "_id": "601936ba4d1d476d4ee470a8",
      "secCategoryid": "601934014d1d476d4ee4708a",
      "subCategory": "Update email ID",
      "createdAt": "2021-02-02T11:25:46.223Z",
      "updatedAt": "2021-02-02T11:25:46.223Z",
      "__v": 0
    },
    {
      "_id": "601936c84d1d476d4ee470a9",
      "secCategoryid": "601934014d1d476d4ee4708a",
      "subCategory": "Mobile number update",
      "createdAt": "2021-02-02T11:26:00.779Z",
      "updatedAt": "2021-02-02T11:26:00.779Z",
      "__v": 0
    },
    {
      "_id": "601936d34d1d476d4ee470aa",
      "secCategoryid": "601934014d1d476d4ee4708a",
      "subCategory": "Update address",
      "createdAt": "2021-02-02T11:26:11.506Z",
      "updatedAt": "2021-02-02T11:26:11.506Z",
      "__v": 0
    },
    {
      "_id": "601936de4d1d476d4ee470ab",
      "secCategoryid": "601934014d1d476d4ee4708a",
      "subCategory": "Update other details(DOB, Name etc)",
      "createdAt": "2021-02-02T11:26:22.793Z",
      "updatedAt": "2021-02-02T11:26:22.793Z",
      "__v": 0
    },
    {
      "_id": "601936fa4d1d476d4ee470ac",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "IMPS issue",
      "createdAt": "2021-02-02T11:26:50.719Z",
      "updatedAt": "2021-02-02T11:26:50.719Z",
      "__v": 0
    },
    {
      "_id": "601937084d1d476d4ee470ad",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "IMPS BLocked",
      "createdAt": "2021-02-02T11:27:04.512Z",
      "updatedAt": "2021-02-02T11:27:04.512Z",
      "__v": 0
    },
    {
      "_id": "601937134d1d476d4ee470ae",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "Beneficiary related",
      "createdAt": "2021-02-02T11:27:15.683Z",
      "updatedAt": "2021-02-02T11:27:15.683Z",
      "__v": 0
    },
    {
      "_id": "601937264d1d476d4ee470af",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "Foreclosure",
      "createdAt": "2021-02-02T11:27:34.263Z",
      "updatedAt": "2021-02-02T11:27:34.263Z",
      "__v": 0
    },
    {
      "_id": "601937324d1d476d4ee470b0",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "Payment related",
      "createdAt": "2021-02-02T11:27:46.068Z",
      "updatedAt": "2021-02-02T11:27:46.068Z",
      "__v": 0
    },
    {
      "_id": "6019373f4d1d476d4ee470b1",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "EMI and due date related",
      "createdAt": "2021-02-02T11:27:59.367Z",
      "updatedAt": "2021-02-02T11:27:59.367Z",
      "__v": 0
    },
    {
      "_id": "6019374e4d1d476d4ee470b2",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "Others",
      "createdAt": "2021-02-02T11:28:14.854Z",
      "updatedAt": "2021-02-02T11:28:14.854Z",
      "__v": 0
    },
    {
      "_id": "601937564d1d476d4ee470b3",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "Fee/charges related",
      "createdAt": "2021-02-02T11:28:22.378Z",
      "updatedAt": "2021-02-02T11:28:22.378Z",
      "__v": 0
    },
    {
      "_id": "601937644d1d476d4ee470b4",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "Credit Limit related",
      "createdAt": "2021-02-02T11:28:36.506Z",
      "updatedAt": "2021-02-02T11:28:36.506Z",
      "__v": 0
    },
    {
      "_id": "601937714d1d476d4ee470b5",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "Tech issue",
      "createdAt": "2021-02-02T11:28:49.235Z",
      "updatedAt": "2021-02-02T11:28:49.235Z",
      "__v": 0
    },
    {
      "_id": "601937804d1d476d4ee470b6",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "Update details",
      "createdAt": "2021-02-02T11:29:04.145Z",
      "updatedAt": "2021-02-02T11:29:04.145Z",
      "__v": 0
    },
    {
      "_id": "601937924d1d476d4ee470b7",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "Cancel the line",
      "createdAt": "2021-02-02T11:29:22.901Z",
      "updatedAt": "2021-02-02T11:29:22.901Z",
      "__v": 0
    },
    {
      "_id": "6019379d4d1d476d4ee470b8",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "Loan restructure request",
      "createdAt": "2021-02-02T11:29:33.404Z",
      "updatedAt": "2021-02-02T11:29:33.404Z",
      "__v": 0
    },
    {
      "_id": "601937a74d1d476d4ee470b9",
      "secCategoryid": "6019340f4d1d476d4ee4708b",
      "subCategory": "Moratorium request",
      "createdAt": "2021-02-02T11:29:43.298Z",
      "updatedAt": "2021-02-02T11:29:43.298Z",
      "__v": 0
    }
  ]);
  const [finalsecSubCategories, sefinalsecSubCategories] = useState([])
  const [secSubCategories, setSecSubCategories] = useState([
    {
      "_id": "601938f04d1d476d4ee470bd",
      "subCategoryid": "601934e94d1d476d4ee4708d",
      "secSubCategory": "Reject",
      "createdAt": "2021-02-02T11:35:12.997Z",
      "updatedAt": "2021-02-02T11:35:12.997Z",
      "__v": 0
    },
    {
      "_id": "601938f84d1d476d4ee470be",
      "subCategoryid": "601934e94d1d476d4ee4708d",
      "secSubCategory": "Tech issue",
      "createdAt": "2021-02-02T11:35:20.955Z",
      "updatedAt": "2021-02-02T11:35:20.955Z",
      "__v": 0
    },
    {
      "_id": "601939044d1d476d4ee470bf",
      "subCategoryid": "601934e94d1d476d4ee4708d",
      "secSubCategory": "Statement upload issue",
      "createdAt": "2021-02-02T11:35:32.450Z",
      "updatedAt": "2021-02-02T11:35:32.450Z",
      "__v": 0
    },
    {
      "_id": "601939104d1d476d4ee470c0",
      "subCategoryid": "601934e94d1d476d4ee4708d",
      "secSubCategory": "Stuck after Submit",
      "createdAt": "2021-02-02T11:35:44.616Z",
      "updatedAt": "2021-02-02T11:35:44.616Z",
      "__v": 0
    },
    {
      "_id": "6019391b4d1d476d4ee470c1",
      "subCategoryid": "601934e94d1d476d4ee4708d",
      "secSubCategory": "Beneficiary details related",
      "createdAt": "2021-02-02T11:35:55.547Z",
      "updatedAt": "2021-02-02T11:35:55.547Z",
      "__v": 0
    },
    {
      "_id": "601939264d1d476d4ee470c2",
      "subCategoryid": "601934e94d1d476d4ee4708d",
      "secSubCategory": "Steps pending after AIP",
      "createdAt": "2021-02-02T11:36:06.579Z",
      "updatedAt": "2021-02-02T11:36:06.579Z",
      "__v": 0
    },
    {
      "_id": "601939314d1d476d4ee470c3",
      "subCategoryid": "601934e94d1d476d4ee4708d",
      "secSubCategory": "Reapply",
      "createdAt": "2021-02-02T11:36:17.632Z",
      "updatedAt": "2021-02-02T11:36:17.632Z",
      "__v": 0
    },
    {
      "_id": "6019396f4d1d476d4ee470c4",
      "subCategoryid": "6019351b4d1d476d4ee4708e",
      "secSubCategory": "Documents required",
      "createdAt": "2021-02-02T11:37:19.054Z",
      "updatedAt": "2021-02-02T11:37:19.054Z",
      "__v": 0
    },
    {
      "_id": "6019397e4d1d476d4ee470c5",
      "subCategoryid": "6019351b4d1d476d4ee4708e",
      "secSubCategory": "Tech issue while uploading documents",
      "createdAt": "2021-02-02T11:37:34.175Z",
      "updatedAt": "2021-02-02T11:37:34.175Z",
      "__v": 0
    },
    {
      "_id": "6019399e4d1d476d4ee470c6",
      "subCategoryid": "601935254d1d476d4ee4708f",
      "secSubCategory": "Tele selling pending",
      "createdAt": "2021-02-02T11:38:06.319Z",
      "updatedAt": "2021-02-02T11:38:06.319Z",
      "__v": 0
    },
    {
      "_id": "601939ab4d1d476d4ee470c7",
      "subCategoryid": "601935254d1d476d4ee4708f",
      "secSubCategory": "Tele selling Negative",
      "createdAt": "2021-02-02T11:38:19.136Z",
      "updatedAt": "2021-02-02T11:38:19.136Z",
      "__v": 0
    },
    {
      "_id": "601939b64d1d476d4ee470c8",
      "subCategoryid": "601935254d1d476d4ee4708f",
      "secSubCategory": "Tele Selling Hold",
      "createdAt": "2021-02-02T11:38:30.875Z",
      "updatedAt": "2021-02-02T11:38:30.875Z",
      "__v": 0
    },
    {
      "_id": "601939c94d1d476d4ee470c9",
      "subCategoryid": "601935254d1d476d4ee4708f",
      "secSubCategory": "Tele Verification Hold",
      "createdAt": "2021-02-02T11:38:49.445Z",
      "updatedAt": "2021-02-02T11:38:49.445Z",
      "__v": 0
    },
    {
      "_id": "601939d64d1d476d4ee470ca",
      "subCategoryid": "601935254d1d476d4ee4708f",
      "secSubCategory": "Tele Verification pending",
      "createdAt": "2021-02-02T11:39:02.493Z",
      "updatedAt": "2021-02-02T11:39:02.493Z",
      "__v": 0
    },
    {
      "_id": "601939e44d1d476d4ee470cb",
      "subCategoryid": "601935254d1d476d4ee4708f",
      "secSubCategory": "Tele Verification Negative",
      "createdAt": "2021-02-02T11:39:16.933Z",
      "updatedAt": "2021-02-02T11:39:16.933Z",
      "__v": 0
    },
    {
      "_id": "601939ff4d1d476d4ee470cc",
      "subCategoryid": "6019352f4d1d476d4ee47090",
      "secSubCategory": "SA pending",
      "createdAt": "2021-02-02T11:39:43.889Z",
      "updatedAt": "2021-02-02T11:39:43.889Z",
      "__v": 0
    },
    {
      "_id": "60193a174d1d476d4ee470cd",
      "subCategoryid": "6019352f4d1d476d4ee47090",
      "secSubCategory": "SA Reject",
      "createdAt": "2021-02-02T11:40:07.610Z",
      "updatedAt": "2021-02-02T11:40:07.610Z",
      "__v": 0
    },
    {
      "_id": "60193a284d1d476d4ee470ce",
      "subCategoryid": "6019352f4d1d476d4ee47090",
      "secSubCategory": "SA Hold",
      "createdAt": "2021-02-02T11:40:24.445Z",
      "updatedAt": "2021-02-02T11:40:24.445Z",
      "__v": 0
    },
    {
      "_id": "60193a4d4d1d476d4ee470cf",
      "subCategoryid": "601935664d1d476d4ee47093",
      "secSubCategory": "Pick up pending",
      "createdAt": "2021-02-02T11:41:01.012Z",
      "updatedAt": "2021-02-02T11:41:01.012Z",
      "__v": 0
    },
    {
      "_id": "60193a564d1d476d4ee470d0",
      "subCategoryid": "601935664d1d476d4ee47093",
      "secSubCategory": "Login Pending",
      "createdAt": "2021-02-02T11:41:10.355Z",
      "updatedAt": "2021-02-02T11:41:10.355Z",
      "__v": 0
    },
    {
      "_id": "60193a5f4d1d476d4ee470d1",
      "subCategoryid": "601935664d1d476d4ee47093",
      "secSubCategory": "OGL",
      "createdAt": "2021-02-02T11:41:19.715Z",
      "updatedAt": "2021-02-02T11:41:19.715Z",
      "__v": 0
    },
    {
      "_id": "60193a684d1d476d4ee470d2",
      "subCategoryid": "601935664d1d476d4ee47093",
      "secSubCategory": "CANA- Current address proof not available",
      "createdAt": "2021-02-02T11:41:28.385Z",
      "updatedAt": "2021-02-02T11:41:28.385Z",
      "__v": 0
    },
    {
      "_id": "60193a764d1d476d4ee470d3",
      "subCategoryid": "601935664d1d476d4ee47093",
      "secSubCategory": "Escalation(field agent)",
      "createdAt": "2021-02-02T11:41:42.851Z",
      "updatedAt": "2021-02-02T11:41:42.851Z",
      "__v": 0
    },
    {
      "_id": "60193a824d1d476d4ee470d4",
      "subCategoryid": "601935664d1d476d4ee47093",
      "secSubCategory": "Re-pickup",
      "createdAt": "2021-02-02T11:41:54.282Z",
      "updatedAt": "2021-02-02T11:41:54.282Z",
      "__v": 0
    },
    {
      "_id": "60193a954d1d476d4ee470d5",
      "subCategoryid": "601935664d1d476d4ee47093",
      "secSubCategory": "Change the pick-up address/location",
      "createdAt": "2021-02-02T11:42:13.977Z",
      "updatedAt": "2021-02-02T11:42:13.977Z",
      "__v": 0
    },
    {
      "_id": "60193aa14d1d476d4ee470d6",
      "subCategoryid": "601935664d1d476d4ee47093",
      "secSubCategory": "Change the pick-up time",
      "createdAt": "2021-02-02T11:42:25.617Z",
      "updatedAt": "2021-02-02T11:42:25.617Z",
      "__v": 0
    },
    {
      "_id": "60193aae4d1d476d4ee470d7",
      "subCategoryid": "601935664d1d476d4ee47093",
      "secSubCategory": "Appointment scheduled for a later date/time",
      "createdAt": "2021-02-02T11:42:38.251Z",
      "updatedAt": "2021-02-02T11:42:38.251Z",
      "__v": 0
    },
    {
      "_id": "60193ad24d1d476d4ee470d8",
      "subCategoryid": "601935704d1d476d4ee47094",
      "secSubCategory": "MT credit pending",
      "createdAt": "2021-02-02T11:43:14.836Z",
      "updatedAt": "2021-02-02T11:43:14.836Z",
      "__v": 0
    },
    {
      "_id": "60193ae14d1d476d4ee470d9",
      "subCategoryid": "601935704d1d476d4ee47094",
      "secSubCategory": "MT credit Hold",
      "createdAt": "2021-02-02T11:43:29.690Z",
      "updatedAt": "2021-02-02T11:43:29.690Z",
      "__v": 0
    },
    {
      "_id": "60193aee4d1d476d4ee470da",
      "subCategoryid": "601935704d1d476d4ee47094",
      "secSubCategory": "MT credit Reject",
      "createdAt": "2021-02-02T11:43:42.464Z",
      "updatedAt": "2021-02-02T11:43:42.464Z",
      "__v": 0
    },
    {
      "_id": "60193af94d1d476d4ee470db",
      "subCategoryid": "601935704d1d476d4ee47094",
      "secSubCategory": "Tech issue",
      "createdAt": "2021-02-02T11:43:53.257Z",
      "updatedAt": "2021-02-02T11:43:53.257Z",
      "__v": 0
    },
    {
      "_id": "60193b154d1d476d4ee470dc",
      "subCategoryid": "6019357f4d1d476d4ee47095",
      "secSubCategory": "Ops Pending",
      "createdAt": "2021-02-02T11:44:21.568Z",
      "updatedAt": "2021-02-02T11:44:21.568Z",
      "__v": 0
    },
    {
      "_id": "60193b204d1d476d4ee470dd",
      "subCategoryid": "6019357f4d1d476d4ee47095",
      "secSubCategory": "Ops Hold",
      "createdAt": "2021-02-02T11:44:32.994Z",
      "updatedAt": "2021-02-02T11:44:32.994Z",
      "__v": 0
    },
    {
      "_id": "60193b2d4d1d476d4ee470de",
      "subCategoryid": "6019357f4d1d476d4ee47095",
      "secSubCategory": "Ops Reject",
      "createdAt": "2021-02-02T11:44:45.387Z",
      "updatedAt": "2021-02-02T11:44:45.387Z",
      "__v": 0
    },
    {
      "_id": "60193b374d1d476d4ee470df",
      "subCategoryid": "6019357f4d1d476d4ee47095",
      "secSubCategory": "Tech issue",
      "createdAt": "2021-02-02T11:44:55.424Z",
      "updatedAt": "2021-02-02T11:44:55.424Z",
      "__v": 0
    },
    {
      "_id": "60193b734d1d476d4ee470e0",
      "subCategoryid": "601936184d1d476d4ee4709f",
      "secSubCategory": "AIP",
      "createdAt": "2021-02-02T11:45:55.004Z",
      "updatedAt": "2021-02-02T11:45:55.004Z",
      "__v": 0
    },
    {
      "_id": "60193b7f4d1d476d4ee470e1",
      "subCategoryid": "601936184d1d476d4ee4709f",
      "secSubCategory": "Tele PD",
      "createdAt": "2021-02-02T11:46:07.729Z",
      "updatedAt": "2021-02-02T11:46:07.729Z",
      "__v": 0
    },
    {
      "_id": "60193b8a4d1d476d4ee470e2",
      "subCategoryid": "601936184d1d476d4ee4709f",
      "secSubCategory": "Soft Approval",
      "createdAt": "2021-02-02T11:46:18.100Z",
      "updatedAt": "2021-02-02T11:46:18.100Z",
      "__v": 0
    },
    {
      "_id": "60193b944d1d476d4ee470e3",
      "subCategoryid": "601936184d1d476d4ee4709f",
      "secSubCategory": "Pick up appointment",
      "createdAt": "2021-02-02T11:46:28.273Z",
      "updatedAt": "2021-02-02T11:46:28.273Z",
      "__v": 0
    },
    {
      "_id": "60193b9e4d1d476d4ee470e4",
      "subCategoryid": "601936184d1d476d4ee4709f",
      "secSubCategory": "Fulfillment",
      "createdAt": "2021-02-02T11:46:38.479Z",
      "updatedAt": "2021-02-02T11:46:38.479Z",
      "__v": 0
    },
    {
      "_id": "60193ba84d1d476d4ee470e5",
      "subCategoryid": "601936184d1d476d4ee4709f",
      "secSubCategory": "MT Credit",
      "createdAt": "2021-02-02T11:46:48.409Z",
      "updatedAt": "2021-02-02T11:46:48.409Z",
      "__v": 0
    },
    {
      "_id": "60193bb84d1d476d4ee470e6",
      "subCategoryid": "601936184d1d476d4ee4709f",
      "secSubCategory": "Ops",
      "createdAt": "2021-02-02T11:47:04.879Z",
      "updatedAt": "2021-02-02T11:47:04.879Z",
      "__v": 0
    },
    {
      "_id": "60193bdb4d1d476d4ee470e7",
      "subCategoryid": "601936214d1d476d4ee470a0",
      "secSubCategory": "AIP",
      "createdAt": "2021-02-02T11:47:39.346Z",
      "updatedAt": "2021-02-02T11:47:39.346Z",
      "__v": 0
    },
    {
      "_id": "60193be44d1d476d4ee470e8",
      "subCategoryid": "601936214d1d476d4ee470a0",
      "secSubCategory": "Tele PD",
      "createdAt": "2021-02-02T11:47:48.889Z",
      "updatedAt": "2021-02-02T11:47:48.889Z",
      "__v": 0
    },
    {
      "_id": "60193bee4d1d476d4ee470e9",
      "subCategoryid": "601936214d1d476d4ee470a0",
      "secSubCategory": "Soft Approval",
      "createdAt": "2021-02-02T11:47:58.730Z",
      "updatedAt": "2021-02-02T11:47:58.730Z",
      "__v": 0
    },
    {
      "_id": "60193bf84d1d476d4ee470ea",
      "subCategoryid": "601936214d1d476d4ee470a0",
      "secSubCategory": "Pick up appointment",
      "createdAt": "2021-02-02T11:48:08.654Z",
      "updatedAt": "2021-02-02T11:48:08.654Z",
      "__v": 0
    },
    {
      "_id": "60193c034d1d476d4ee470eb",
      "subCategoryid": "601936214d1d476d4ee470a0",
      "secSubCategory": "Fulfillment",
      "createdAt": "2021-02-02T11:48:19.687Z",
      "updatedAt": "2021-02-02T11:48:19.687Z",
      "__v": 0
    },
    {
      "_id": "60193c0b4d1d476d4ee470ec",
      "subCategoryid": "601936214d1d476d4ee470a0",
      "secSubCategory": "MT Credit",
      "createdAt": "2021-02-02T11:48:27.485Z",
      "updatedAt": "2021-02-02T11:48:27.485Z",
      "__v": 0
    },
    {
      "_id": "60193c154d1d476d4ee470ed",
      "subCategoryid": "601936214d1d476d4ee470a0",
      "secSubCategory": "Ops",
      "createdAt": "2021-02-02T11:48:37.579Z",
      "updatedAt": "2021-02-02T11:48:37.579Z",
      "__v": 0
    },
    {
      "_id": "60193c2f4d1d476d4ee470ee",
      "subCategoryid": "6019362c4d1d476d4ee470a1",
      "secSubCategory": "AIP",
      "createdAt": "2021-02-02T11:49:03.694Z",
      "updatedAt": "2021-02-02T11:49:03.694Z",
      "__v": 0
    },
    {
      "_id": "60193c3c4d1d476d4ee470ef",
      "subCategoryid": "6019362c4d1d476d4ee470a1",
      "secSubCategory": "Tele PD",
      "createdAt": "2021-02-02T11:49:16.150Z",
      "updatedAt": "2021-02-02T11:49:16.150Z",
      "__v": 0
    },
    {
      "_id": "60193c484d1d476d4ee470f0",
      "subCategoryid": "6019362c4d1d476d4ee470a1",
      "secSubCategory": "Soft Approval",
      "createdAt": "2021-02-02T11:49:28.523Z",
      "updatedAt": "2021-02-02T11:49:28.523Z",
      "__v": 0
    },
    {
      "_id": "60193c534d1d476d4ee470f1",
      "subCategoryid": "6019362c4d1d476d4ee470a1",
      "secSubCategory": "Pick up appointment",
      "createdAt": "2021-02-02T11:49:39.909Z",
      "updatedAt": "2021-02-02T11:49:39.909Z",
      "__v": 0
    },
    {
      "_id": "60193c624d1d476d4ee470f2",
      "subCategoryid": "6019362c4d1d476d4ee470a1",
      "secSubCategory": "Fulfillment",
      "createdAt": "2021-02-02T11:49:54.214Z",
      "updatedAt": "2021-02-02T11:49:54.214Z",
      "__v": 0
    },
    {
      "_id": "60193c7c4d1d476d4ee470f3",
      "subCategoryid": "6019362c4d1d476d4ee470a1",
      "secSubCategory": "MT Credit",
      "createdAt": "2021-02-02T11:50:20.290Z",
      "updatedAt": "2021-02-02T11:50:20.290Z",
      "__v": 0
    },
    {
      "_id": "60193c864d1d476d4ee470f4",
      "subCategoryid": "6019362c4d1d476d4ee470a1",
      "secSubCategory": "Ops",
      "createdAt": "2021-02-02T11:50:30.870Z",
      "updatedAt": "2021-02-02T11:50:30.870Z",
      "__v": 0
    },
    {
      "_id": "60193cbc4d1d476d4ee470f5",
      "subCategoryid": "601936384d1d476d4ee470a2",
      "secSubCategory": "AIP",
      "createdAt": "2021-02-02T11:51:24.361Z",
      "updatedAt": "2021-02-02T11:51:24.361Z",
      "__v": 0
    },
    {
      "_id": "60193ccb4d1d476d4ee470f6",
      "subCategoryid": "601936384d1d476d4ee470a2",
      "secSubCategory": "Tele PD",
      "createdAt": "2021-02-02T11:51:39.766Z",
      "updatedAt": "2021-02-02T11:51:39.766Z",
      "__v": 0
    },
    {
      "_id": "60193ce54d1d476d4ee470f7",
      "subCategoryid": "601936384d1d476d4ee470a2",
      "secSubCategory": "Soft Approval",
      "createdAt": "2021-02-02T11:52:05.284Z",
      "updatedAt": "2021-02-02T11:52:05.284Z",
      "__v": 0
    },
    {
      "_id": "60193cef4d1d476d4ee470f8",
      "subCategoryid": "601936384d1d476d4ee470a2",
      "secSubCategory": "Pick up appointment",
      "createdAt": "2021-02-02T11:52:15.957Z",
      "updatedAt": "2021-02-02T11:52:15.957Z",
      "__v": 0
    },
    {
      "_id": "60193cfa4d1d476d4ee470f9",
      "subCategoryid": "601936384d1d476d4ee470a2",
      "secSubCategory": "Fulfillment",
      "createdAt": "2021-02-02T11:52:26.482Z",
      "updatedAt": "2021-02-02T11:52:26.482Z",
      "__v": 0
    },
    {
      "_id": "60193d024d1d476d4ee470fa",
      "subCategoryid": "601936384d1d476d4ee470a2",
      "secSubCategory": "MT Credit",
      "createdAt": "2021-02-02T11:52:34.272Z",
      "updatedAt": "2021-02-02T11:52:34.272Z",
      "__v": 0
    },
    {
      "_id": "60193d0d4d1d476d4ee470fb",
      "subCategoryid": "601936384d1d476d4ee470a2",
      "secSubCategory": "Ops",
      "createdAt": "2021-02-02T11:52:45.289Z",
      "updatedAt": "2021-02-02T11:52:45.289Z",
      "__v": 0
    },
    {
      "_id": "60193d234d1d476d4ee470fc",
      "subCategoryid": "6019364a4d1d476d4ee470a3",
      "secSubCategory": "AIP",
      "createdAt": "2021-02-02T11:53:07.224Z",
      "updatedAt": "2021-02-02T11:53:07.224Z",
      "__v": 0
    },
    {
      "_id": "60193d2b4d1d476d4ee470fd",
      "subCategoryid": "6019364a4d1d476d4ee470a3",
      "secSubCategory": "Tele PD",
      "createdAt": "2021-02-02T11:53:15.751Z",
      "updatedAt": "2021-02-02T11:53:15.751Z",
      "__v": 0
    },
    {
      "_id": "60193d364d1d476d4ee470fe",
      "subCategoryid": "6019364a4d1d476d4ee470a3",
      "secSubCategory": "Soft Approval",
      "createdAt": "2021-02-02T11:53:26.657Z",
      "updatedAt": "2021-02-02T11:53:26.657Z",
      "__v": 0
    },
    {
      "_id": "60193d414d1d476d4ee470ff",
      "subCategoryid": "6019364a4d1d476d4ee470a3",
      "secSubCategory": "Pick up appointment",
      "createdAt": "2021-02-02T11:53:37.530Z",
      "updatedAt": "2021-02-02T11:53:37.530Z",
      "__v": 0
    },
    {
      "_id": "60193d4c4d1d476d4ee47100",
      "subCategoryid": "6019364a4d1d476d4ee470a3",
      "secSubCategory": "Fulfillment",
      "createdAt": "2021-02-02T11:53:48.131Z",
      "updatedAt": "2021-02-02T11:53:48.131Z",
      "__v": 0
    },
    {
      "_id": "60193d534d1d476d4ee47101",
      "subCategoryid": "6019364a4d1d476d4ee470a3",
      "secSubCategory": "MT Credit",
      "createdAt": "2021-02-02T11:53:55.945Z",
      "updatedAt": "2021-02-02T11:53:55.945Z",
      "__v": 0
    },
    {
      "_id": "60193d5e4d1d476d4ee47102",
      "subCategoryid": "6019364a4d1d476d4ee470a3",
      "secSubCategory": "Ops",
      "createdAt": "2021-02-02T11:54:06.209Z",
      "updatedAt": "2021-02-02T11:54:06.209Z",
      "__v": 0
    },
    {
      "_id": "60193d7f4d1d476d4ee47103",
      "subCategoryid": "601936594d1d476d4ee470a4",
      "secSubCategory": "AIP",
      "createdAt": "2021-02-02T11:54:39.068Z",
      "updatedAt": "2021-02-02T11:54:39.068Z",
      "__v": 0
    },
    {
      "_id": "60193d864d1d476d4ee47104",
      "subCategoryid": "601936594d1d476d4ee470a4",
      "secSubCategory": "Tele PD",
      "createdAt": "2021-02-02T11:54:46.880Z",
      "updatedAt": "2021-02-02T11:54:46.880Z",
      "__v": 0
    },
    {
      "_id": "60193d8f4d1d476d4ee47105",
      "subCategoryid": "601936594d1d476d4ee470a4",
      "secSubCategory": "Soft Approval",
      "createdAt": "2021-02-02T11:54:55.705Z",
      "updatedAt": "2021-02-02T11:54:55.705Z",
      "__v": 0
    },
    {
      "_id": "60193d9b4d1d476d4ee47106",
      "subCategoryid": "601936594d1d476d4ee470a4",
      "secSubCategory": "Pick up appointment",
      "createdAt": "2021-02-02T11:55:07.964Z",
      "updatedAt": "2021-02-02T11:55:07.964Z",
      "__v": 0
    },
    {
      "_id": "60193dae4d1d476d4ee47107",
      "subCategoryid": "601936594d1d476d4ee470a4",
      "secSubCategory": "Fulfillment",
      "createdAt": "2021-02-02T11:55:26.130Z",
      "updatedAt": "2021-02-02T11:55:26.130Z",
      "__v": 0
    },
    {
      "_id": "60193db84d1d476d4ee47108",
      "subCategoryid": "601936594d1d476d4ee470a4",
      "secSubCategory": "MT Credit",
      "createdAt": "2021-02-02T11:55:36.208Z",
      "updatedAt": "2021-02-02T11:55:36.208Z",
      "__v": 0
    },
    {
      "_id": "60193dc14d1d476d4ee47109",
      "subCategoryid": "601936594d1d476d4ee470a4",
      "secSubCategory": "Ops",
      "createdAt": "2021-02-02T11:55:45.431Z",
      "updatedAt": "2021-02-02T11:55:45.431Z",
      "__v": 0
    },
    {
      "_id": "60193ddb4d1d476d4ee4710a",
      "subCategoryid": "601936654d1d476d4ee470a5",
      "secSubCategory": "AIP",
      "createdAt": "2021-02-02T11:56:11.173Z",
      "updatedAt": "2021-02-02T11:56:11.173Z",
      "__v": 0
    },
    {
      "_id": "60193de34d1d476d4ee4710b",
      "subCategoryid": "601936654d1d476d4ee470a5",
      "secSubCategory": "Tele PD",
      "createdAt": "2021-02-02T11:56:19.644Z",
      "updatedAt": "2021-02-02T11:56:19.644Z",
      "__v": 0
    },
    {
      "_id": "60193dee4d1d476d4ee4710c",
      "subCategoryid": "601936654d1d476d4ee470a5",
      "secSubCategory": "Soft Approval",
      "createdAt": "2021-02-02T11:56:30.227Z",
      "updatedAt": "2021-02-02T11:56:30.227Z",
      "__v": 0
    },
    {
      "_id": "60193df74d1d476d4ee4710d",
      "subCategoryid": "601936654d1d476d4ee470a5",
      "secSubCategory": "Pick up appointment",
      "createdAt": "2021-02-02T11:56:39.371Z",
      "updatedAt": "2021-02-02T11:56:39.371Z",
      "__v": 0
    },
    {
      "_id": "60193e024d1d476d4ee4710e",
      "subCategoryid": "601936654d1d476d4ee470a5",
      "secSubCategory": "Fulfillment",
      "createdAt": "2021-02-02T11:56:50.204Z",
      "updatedAt": "2021-02-02T11:56:50.204Z",
      "__v": 0
    },
    {
      "_id": "60193e0a4d1d476d4ee4710f",
      "subCategoryid": "601936654d1d476d4ee470a5",
      "secSubCategory": "MT Credit",
      "createdAt": "2021-02-02T11:56:58.092Z",
      "updatedAt": "2021-02-02T11:56:58.092Z",
      "__v": 0
    },
    {
      "_id": "60193e144d1d476d4ee47110",
      "subCategoryid": "601936654d1d476d4ee470a5",
      "secSubCategory": "Ops",
      "createdAt": "2021-02-02T11:57:08.249Z",
      "updatedAt": "2021-02-02T11:57:08.249Z",
      "__v": 0
    },
    {
      "_id": "60193e3a4d1d476d4ee47111",
      "subCategoryid": "601936fa4d1d476d4ee470ac",
      "secSubCategory": "Failed",
      "createdAt": "2021-02-02T11:57:46.730Z",
      "updatedAt": "2021-02-02T11:57:46.730Z",
      "__v": 0
    },
    {
      "_id": "60193e444d1d476d4ee47112",
      "subCategoryid": "601936fa4d1d476d4ee470ac",
      "secSubCategory": "Successful but didn't receive the amount",
      "createdAt": "2021-02-02T11:57:56.258Z",
      "updatedAt": "2021-02-02T11:57:56.258Z",
      "__v": 0
    },
    {
      "_id": "60193e524d1d476d4ee47113",
      "subCategoryid": "601936fa4d1d476d4ee470ac",
      "secSubCategory": "FOIR",
      "createdAt": "2021-02-02T11:58:10.682Z",
      "updatedAt": "2021-02-02T11:58:10.682Z",
      "__v": 0
    },
    {
      "_id": "60193e5a4d1d476d4ee47114",
      "subCategoryid": "601936fa4d1d476d4ee470ac",
      "secSubCategory": "Withdrawal limit cap",
      "createdAt": "2021-02-02T11:58:18.083Z",
      "updatedAt": "2021-02-02T11:58:18.083Z",
      "__v": 0
    },
    {
      "_id": "60193e654d1d476d4ee47115",
      "subCategoryid": "601936fa4d1d476d4ee470ac",
      "secSubCategory": "Pending",
      "createdAt": "2021-02-02T11:58:29.315Z",
      "updatedAt": "2021-02-02T11:58:29.315Z",
      "__v": 0
    },
    {
      "_id": "60193e6b4d1d476d4ee47116",
      "subCategoryid": "601936fa4d1d476d4ee470ac",
      "secSubCategory": "Customer declined",
      "createdAt": "2021-02-02T11:58:35.904Z",
      "updatedAt": "2021-02-02T11:58:35.904Z",
      "__v": 0
    },
    {
      "_id": "60193e814d1d476d4ee47117",
      "subCategoryid": "601937084d1d476d4ee470ad",
      "secSubCategory": "Policy change",
      "createdAt": "2021-02-02T11:58:57.327Z",
      "updatedAt": "2021-02-02T11:58:57.327Z",
      "__v": 0
    },
    {
      "_id": "60193e8f4d1d476d4ee47118",
      "subCategoryid": "601937084d1d476d4ee470ad",
      "secSubCategory": "Temporary suspension",
      "createdAt": "2021-02-02T11:59:11.190Z",
      "updatedAt": "2021-02-02T11:59:11.190Z",
      "__v": 0
    },
    {
      "_id": "60193e984d1d476d4ee47119",
      "subCategoryid": "601937084d1d476d4ee470ad",
      "secSubCategory": "Fraud Suspect",
      "createdAt": "2021-02-02T11:59:20.226Z",
      "updatedAt": "2021-02-02T11:59:20.226Z",
      "__v": 0
    },
    {
      "_id": "60193ea14d1d476d4ee4711a",
      "subCategoryid": "601937084d1d476d4ee470ad",
      "secSubCategory": "Duplicate Beneficiary",
      "createdAt": "2021-02-02T11:59:29.814Z",
      "updatedAt": "2021-02-02T11:59:29.814Z",
      "__v": 0
    },
    {
      "_id": "60193eab4d1d476d4ee4711b",
      "subCategoryid": "601937084d1d476d4ee470ad",
      "secSubCategory": "NACH required block",
      "createdAt": "2021-02-02T11:59:39.902Z",
      "updatedAt": "2021-02-02T11:59:39.902Z",
      "__v": 0
    },
    {
      "_id": "60193eb74d1d476d4ee4711c",
      "subCategoryid": "601937084d1d476d4ee470ad",
      "secSubCategory": "E-mandate blocked",
      "createdAt": "2021-02-02T11:59:51.464Z",
      "updatedAt": "2021-02-02T11:59:51.464Z",
      "__v": 0
    },
    {
      "_id": "60193ec24d1d476d4ee4711d",
      "subCategoryid": "601937084d1d476d4ee470ad",
      "secSubCategory": "NACH required block- NACH form shared",
      "createdAt": "2021-02-02T12:00:02.826Z",
      "updatedAt": "2021-02-02T12:00:02.826Z",
      "__v": 0
    },
    {
      "_id": "60193ed04d1d476d4ee4711e",
      "subCategoryid": "601937084d1d476d4ee470ad",
      "secSubCategory": "NACH required block- Sent for unblocking",
      "createdAt": "2021-02-02T12:00:16.561Z",
      "updatedAt": "2021-02-02T12:00:16.561Z",
      "__v": 0
    },
    {
      "_id": "60193edd4d1d476d4ee4711f",
      "subCategoryid": "601937084d1d476d4ee470ad",
      "secSubCategory": "Bank statement requested",
      "createdAt": "2021-02-02T12:00:29.591Z",
      "updatedAt": "2021-02-02T12:00:29.591Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47120",
      "subCategoryid": "601937084d1d476d4ee470ad",
      "secSubCategory": "Sent for unblocking",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47121",
      "subCategoryid": "601937084d1d476d4ee470ad",
      "secSubCategory": "Others",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47122",
      "subCategoryid": "601937134d1d476d4ee470ae",
      "secSubCategory": "Update beneficiary",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47123",
      "subCategoryid": "601937134d1d476d4ee470ae",
      "secSubCategory": "Wrong beneficiary",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47124",
      "subCategoryid": "601937134d1d476d4ee470ae",
      "secSubCategory": "NACH form shared",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47125",
      "subCategoryid": "601937264d1d476d4ee470af",
      "secSubCategory": "Details shared",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47126",
      "subCategoryid": "601937264d1d476d4ee470af",
      "secSubCategory": "Incorrect foreclosure letter received",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47127",
      "subCategoryid": "601937264d1d476d4ee470af",
      "secSubCategory": "Payment link sent",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47128",
      "subCategoryid": "601937264d1d476d4ee470af",
      "secSubCategory": "Didn't complete 3 EMI(npt eligible)",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47129",
      "subCategoryid": "601937264d1d476d4ee470af",
      "secSubCategory": "Payment update pending",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47130",
      "subCategoryid": "601937264d1d476d4ee470af",
      "secSubCategory": "NOC",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47131",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Mode of payment/ How to pay?",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47132",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Auto debit didn't happen",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47133",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "EMI bounced",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47134",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Mutiple times payment(refund request)",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47135",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Payment link not available in the app",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }
    , {
      "_id": "60193ee84d1d476d4ee47136",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Late fee reversal",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47137",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Bounce charges reversal",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47138",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Alternate mode- Payment update pending",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47139",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Auto debit- Payment update pending",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47140",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Payment reminder complaints",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47141",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Other collection issues",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47142",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Can't pay right now",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47143",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Gateway charges",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47144",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Incorrect EMI sent in the payment link/reminder",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47145",
      "subCategoryid": "601937324d1d476d4ee470b0",
      "secSubCategory": "Paid in advance",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },
    {
      "_id": "60193ee84d1d476d4ee47146",
      "subCategoryid": "6019373f4d1d476d4ee470b1",
      "secSubCategory": "EMI amount",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47147",
      "subCategoryid": "6019373f4d1d476d4ee470b1",
      "secSubCategory": "Incorrect EMI shown",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47148",
      "subCategoryid": "6019373f4d1d476d4ee470b1",
      "secSubCategory": "Due date",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47149",
      "subCategoryid": "6019373f4d1d476d4ee470b1",
      "secSubCategory": "change due date",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47150",
      "subCategoryid": "6019373f4d1d476d4ee470b1",
      "secSubCategory": "change tenure",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }
    , {
      "_id": "60193ee84d1d476d4ee47151",
      "subCategoryid": "6019374e4d1d476d4ee470b2",
      "secSubCategory": "Account statement/payment summary",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47152",
      "subCategoryid": "6019374e4d1d476d4ee470b2",
      "secSubCategory": "Welcome letter",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47153",
      "subCategoryid": "6019374e4d1d476d4ee470b2",
      "secSubCategory": "CIBIL Related",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47154",
      "subCategoryid": "6019374e4d1d476d4ee470b2",
      "secSubCategory": "RBI escalation",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }
    , {
      "_id": "60193ee84d1d476d4ee47155",
      "subCategoryid": "601937564d1d476d4ee470b3",
      "secSubCategory": "Line set up fee",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47156",
      "subCategoryid": "601937564d1d476d4ee470b3",
      "secSubCategory": "Interest rate",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47157",
      "subCategoryid": "601937564d1d476d4ee470b3",
      "secSubCategory": "Processing fee",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    },

    {
      "_id": "60193ee84d1d476d4ee47158",
      "subCategoryid": "601937644d1d476d4ee470b4",
      "secSubCategory": "Incorrect limit",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47159",
      "subCategoryid": "601937644d1d476d4ee470b4",
      "secSubCategory": "Increase limit",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }
    , {
      "_id": "60193ee84d1d476d4ee47160",
      "subCategoryid": "601937714d1d476d4ee470b5",
      "secSubCategory": "Login issue",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }
    , {
      "_id": "60193ee84d1d476d4ee47161",
      "subCategoryid": "601937804d1d476d4ee470b6",
      "secSubCategory": "Update email ID",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47162",
      "subCategoryid": "601937804d1d476d4ee470b6",
      "secSubCategory": "Mobile number update",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }, {
      "_id": "60193ee84d1d476d4ee47163",
      "subCategoryid": "601937804d1d476d4ee470b6",
      "secSubCategory": "Update address",
      "createdAt": "2021-02-02T12:00:40.162Z",
      "updatedAt": "2021-02-02T12:00:40.162Z",
      "__v": 0
    }
  ]);

  const handleChange = (e, s) => {

  };
  useEffect(() => {
    let unmounted = false;

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem('AgentType') === 'Outbound') {


      console.log(props.selectedData1, "props came")


      var finalsubCategories1 = []

      var issuetype = issuetypes.filter((element) => element.issuetype === props.selectedData1.issuetype)
      if (issuetype.length) {
        issuetype = issuetype[0]
      }




      var category = categories.filter((element) => element.category === props.selectedData1.category)
      if (category.length) {

        category = category[0]
      }



      var seccategory = seccategories.filter((element) => element.secCategory === props.selectedData1.seccategory)
      if (seccategory.length) {

        seccategory = seccategory[0].secCategory
        const result = subCategories.filter(data => data.secCategoryid === seccategory._id);
        // setfinalsubCategories(result);
        // finalsubCategories1 = result
      }


      // console.log('finalsubCategories', finalsubCategories1)
      // console.log(props.selectedData1.subcategory, "recheck")
      // var subcategory = secSubCategories.filter((element) => element.secSubCategory === props.selectedData1.secsubcategory)
      // console.log('subcategory ', subcategory)

      var secsubcategory1 = subCategories.filter((element) => {
        // console.log(props.selectedData1.secsubcategory,"props one data -", element.subCategory)
        return element.subCategory === props.selectedData1.secsubcategory
      })



      if (secsubcategory1.length) {

        var secsubcategory = secsubcategory1[0].subCategory

      }












      // if (subcategory.length) {
      //   subcategory = subcategory[0]
      //   // console.log('subcategory !!!!', subcategory)

      //   console.log(subcategory,"props data subcategory")

      // }

      var subcategory = subCategories.filter((element) => element.subCategory === props.selectedData1.subcategory)


      if (subcategory.length) {
        subcategory = subcategory[0]
      }




      var data = {
        CallerName: props.selectedData1.CallerName,
        callermobilenumber: props.selectedData1.callermobilenumber,
        callerapplication: props.selectedData1.callerapplication,
        subcategory: props.selectedData1.subcategory,  //
        category: category,
        secsubcategory: props.selectedData1.secsubcategory, //
        seccategory: seccategory,
        comments: props.selectedData1.comments,
        type: props.selectedData1.type,
        issuetype: issuetype,
      }

      console.log(data, "data")

      setInitialValue(data)
    }
  }, [props])

  function updateCallData(uniqueid, dispostionData) {
    let data = JSON.stringify(dispostionData);
    // console.log('updateCAllData', data, uniqueid);

    let config = {
      method: 'post',

      url: UPDATE_CALL_STATUS + uniqueid,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(response => {
        // console.log('dispostionForm', JSON.stringify(response.data));
        // props.getALF();
      })
      .catch(error => {
        console.log('dispostionFrom', error);
      });
  }

  function updateAgentCallStatus(updateData) {
    var axios = require('axios');
    var data = {
      // agentCallStatus: updateData.callStatus,
      agentCallEvent: updateData.callEvent,
      agentCallUniqueId: updateData.callUniqueId,
      agentCallType: updateData.callType,
      agentCallDispositionStatus: updateData.callDispositionStatus,
      callerNumber: updateData.callerNumber
    };
    var config = {

      method: 'put',
      url: UPDATE_CURRENT_STATUS + updateData.callStatusId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        // console.log("update", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const handleBreak = (e) => {
    var axios = require('axios');
    const AgentSIPID = localStorage.getItem('AgentSIPID')

    // const AgentSIPID = localStorage.getItem('AgentSIPID')

    var axios = require('axios');
    var config = {
      method: 'get',
      url: `http://192.168.3.36:52005/ami/actions/break?Queue=5001&Interface=SIP%2F${AgentSIPID}&Reason=AgentDisposed&Break=false`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log((response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmitDisposition = (data) => {
    console.log(data, "form data")

    handleBreak()

    const id = localStorage.getItem('Interaction_id')
    console.log(id, "agentid")
    var axios = require('axios');


    var config = {
      method: 'put',
      url: `http://192.168.3.36:5000/api/interactions/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { "updateData": data }
    };

    axios(config)
      .then(function (response) {
        console.log(response, "response")

      })
      .catch(function (error) {
        console.log(error);
      });
  }


  function handleSubmit(e) {
    handleSubmitDisposition()
    // handleBreak()
    console.log('formRef', formRef.current.values);
    console.log('initialValue', initialValue)
    var categoryOBJ = formRef.current.values.category;
    var seccategoryOBJ = formRef.current.values.seccategory;
    var subcategoryOBJ = formRef.current.values.subcategory;
    var secsubcategoryOBJ = formRef.current.values.secsubcategory;

    var category = '';
    var secCategory = '';
    var subCategory = '';
    var secSubCategory = '';


    // var data = {
    //         "CallerName": "Vikram",
    //         "callerapplication": "VI6736637",
    //         "callermobilenumber": "9935413775",
    //         "category": {_id: "6019329a4d1d476d4ee4707c", category: "Tapstart", createdAt: "2021-02-02T11:08:10.879Z", updatedAt: "2021-02-02T11:08:10.879Z", __v: 0}
    //         "comments": "Comments"
    //         "issuetype": {issuetype: "Request"}
    //         "seccategory": {_id: "601933b74d1d476d4ee47085", categoryid: "6019329a4d1d476d4ee4707c", secCategory: "Application Status", createdAt: "2021-02-02T11:12:55.201Z", updatedAt: "2021-02-02T11:12:55.201Z", …}
    //         "secsubcategory": {_id: "601938f04d1d476d4ee470bd", subCategoryid: "601934e94d1d476d4ee4708d", secSubCategory: "Reject", createdAt: "2021-02-02T11:35:12.997Z", updatedAt: "2021-02-02T11:35:12.997Z", …}
    //         "subcategory": {_id: "601934e94d1d476d4ee4708d", secCategoryid: "601933b74d1d476d4ee47085", subCategory: "AIP", createdAt: "2021-02-02T11:18:01.592Z", updatedAt: "2021-02-02T11:18:01.592Z", …}
    //         "type": "closed"
    // }
    // console.log('category', typeof categoryOBJ)

    if (typeof categoryOBJ === 'object') {
      if ('category' in categoryOBJ) {
        category = categoryOBJ.category
      }

    }
    if (typeof seccategoryOBJ === 'object') {
      if ('secCategory' in seccategoryOBJ) {
        secCategory = seccategoryOBJ.secCategory
      }
    }
    if (typeof subcategoryOBJ === 'object') {
      if ('subCategory' in subcategoryOBJ) {
        subCategory = subcategoryOBJ.subCategory
      }
    }
    if (typeof secsubcategoryOBJ === 'object') {
      if ('secSubCategory' in secsubcategoryOBJ) {
        secSubCategory = secsubcategoryOBJ.secSubCategory
      }
    }

    var data = {
      "CallerName": formRef.current.values.CallerName,
      "callerapplication": formRef.current.values.callerapplication,
      "callermobilenumber": formRef.current.values.callermobilenumber,
      "comments": formRef.current.values.comments,
      "type": formRef.current.values.type,
      "issuetype": formRef.current.values.issuetype.issuetype,
      "category": category,
      "seccategory": secCategory,
      "secsubcategory": secSubCategory,
      "subcategory": subCategory

    }

    handleSubmitDisposition(data)

    console.log(data, "formdata")

    if (localStorage.getItem('AgentType') === 'Outbound') {
      data = {
        CallerName: initialValue.CallerName,
        callermobilenumber: initialValue.callermobilenumber,
        callerapplication: initialValue.callerapplication,
        comments: formRef.current.values.comments,
        type: formRef.current.values.type,
      }

      console.log('initialValue', initialValue);
      var subcategory = initialValue.subcategory;
      console.log('subcategory', subcategory);
      if (typeof subcategory === 'object') {
        data['subcategory'] = initialValue.subcategory.subCategory
      } else {
        data['subcategory'] = initialValue.subcategory;
      }
      var category = initialValue.category;
      console.log('category', typeof category);
      if (typeof category === 'object') {
        data['category'] = initialValue.category.category
      } else {
        data['category'] = initialValue.category;
      }
      var secsubcategory = initialValue.secsubcategory;
      console.log('secsubcategory', secsubcategory);
      if (typeof secsubcategory === 'object') {
        data['secsubcategory'] = initialValue.secsubcategory.secSubCategory
      } else {
        data['secsubcategory'] = initialValue.secsubcategory;
      }
      var seccategory = initialValue.seccategory;
      console.log('seccategory', seccategory);
      if (typeof seccategory === 'object') {
        data['seccategory'] = initialValue.seccategory.secCategory
      } else {
        data['seccategory'] = initialValue.seccategory;
      }

      var issuetype = initialValue.issuetype;
      console.log('issuetype', issuetype);

      if (typeof issuetype === 'object') {
        data['issuetype'] = initialValue.issuetype.issuetype
      } else {
        data['issuetype'] = '';
      }
    }
    console.log('data after outbound', data)

    localStorage.setItem('callDispositionStatus', 'Disposed');
    localStorage.setItem('callDispositionStatus', 'Disposed');
    if (localStorage.getItem('Agenttype') === 'L1') {
      removeFromQueue(`SIP/${localStorage.getItem('AgentSIPID')}`, 5003)
      addToQueue(`SIP/${localStorage.getItem('AgentSIPID')}`, 5003)
    }
    if (localStorage.getItem('Agenttype') === 'L2') {
      removeFromQueue('Local/3' + localStorage.getItem('AgentSIPID') + '@from-queue', 5001)
      addToQueue('Local/3' + localStorage.getItem('AgentSIPID') + '@from-queue', 5001)
    }
    props.setCurrentCallDetails(
      localStorage.getItem('callStatusId'),
      localStorage.getItem('callUniqueId'),
      localStorage.getItem('callType'),
      localStorage.getItem('callStatus'),
      localStorage.getItem('callEvent'),
      localStorage.getItem('callDispositionStatus'),
      localStorage.getItem('callerNumber'),
      localStorage.getItem('breakStatus')
    );
    updateCallData(localStorage.getItem('callUniqueId'), data);
    if (localStorage.getItem('AgentType') === 'Outbound') {

      var finalType = data.type;
      if (data.type === 'open' || data.type === 'close') {
        finalType = 'close';
      }
      if (data.type === 'disconnected') {
        finalType = 'open';
      }
      updateCallData(localStorage.getItem('L1ID'), {
        "type": finalType
      });
    }
    updateAgentCallStatus({
      callStatusId: localStorage.getItem('callStatusId'),
      callUniqueId: localStorage.getItem('callUniqueId'),
      callType: localStorage.getItem('callType'),
      callStatus: localStorage.getItem('callStatus'),
      callEvent: localStorage.getItem('callEvent'),
      callDispositionStatus: localStorage.getItem('callDispositionStatus'),
      callerNumber: localStorage.getItem('callerNumber'),
    })



  }
  const [autoCompleteKey, setAutoCompleteKey] = useState(0);
  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValue}
      disform={initialValue}
      onSubmit={(e, { validate }) => {
        handleSubmit(e);
        validate(e);
      }}
      innerRef={formRef}
      validationSchema={yup.object({
        issuetype: yup
          .object()
          .required('Please select a  Issue Type')
          .typeError('Please select a  Issue Type'),
        category: yup
          .object()
          .required('Please select a  Patner Name')
          .typeError('Please select a valid  Patner Name'),
        seccategory: yup
          .object()
          .required('Please select a  Tag')
          .typeError('Please select a valid  Tag'),
        subcategory: yup
          .object()
          .required('Please select a  sub Tag 1')
          .typeError('Please select a valid  sub Tag 1'),
        secsubcategory: yup
          .object()
          .required('Please select a  sub Tag 2')
          .typeError('Please select a valid  Sub Tag 2'),
        comments: yup.string().required('Please Enter Comments'),

      })}
    >
      {({ setFieldValue }) => (
        <Form>
          <Grid container spacing={2} direction="row">
            {localStorage.getItem('AgentType') === 'Inbound' ? <Grid item xs={4} sm={4}>
              <Field
                className={classes.fieldContainer}
                disabled={false}
                name="CallerName"
                component={TextField}
                variant="outlined"
                multiline
                label="Caller Name"
              />
            </Grid> : <Grid item xs={4} sm={4}>
              <Field
                className={classes.fieldContainer}
                value={initialValue.CallerName}
                disabled={true}
                name="CallerName"
                component={TextField}
                variant="outlined"
                multiline
                label="Caller Name"
              />
            </Grid>}
            {localStorage.getItem('AgentType') === 'Inbound' ?
              <Grid item xs={4} sm={4}>
                <Field
                  className={classes.fieldContainer}
                  name="callerapplication"
                  disabled={false}
                  component={TextField}
                  variant="outlined"
                  multiline
                  label="Caller Application Number"
                />
              </Grid> : <Grid item xs={4} sm={4}>
                <Field
                  className={classes.fieldContainer}
                  name="callerapplication"
                  value={initialValue.callerapplication}
                  disabled={true}
                  component={TextField}
                  variant="outlined"
                  multiline
                  label="Caller Application Number"
                />
              </Grid>}

            {localStorage.getItem('AgentType') === 'Inbound' ?
              <Grid item xs={4} sm={4}>
                <Field
                  className={classes.fieldContainer}
                  name="callermobilenumber"
                  disabled={false}
                  component={TextField}
                  variant="outlined"
                  multiline
                  label="Caller Mobile Number"
                />
              </Grid> : <Grid item xs={4} sm={4}>
                <Field
                  className={classes.fieldContainer}
                  name="callermobilenumber"
                  value={initialValue.callermobilenumber}
                  disabled={true}
                  component={TextField}
                  variant="outlined"
                  multiline
                  label="Caller Mobile Number"
                />
              </Grid>}

            {localStorage.getItem('AgentType') === 'Inbound' ?
              <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
                  <Autocomplete
                    options={issuetypes}
                    getOptionLabel={option => typeof option === 'string' ? option : option.issuetype}
                    disabled={false}
                    value={initialValue.issuetype}
                    getOptionSelected={(option, value) => {
                      return value.issuetype === option.issuetype
                    }}
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      // console.log('value', value)
                      setFieldValue('issuetype', value);
                      var i = initialValue;
                      i.issuetype = value;
                      setInitialValue(i)
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select a issue Type"
                        variant="outlined"
                        name="issuetype"
                      />
                    )}
                    name="issuetype"
                  />
                </FormControl>
              </Grid> : <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
                  <Autocomplete
                    options={issuetypes}
                    getOptionLabel={option => typeof option === 'string' ? option : option.issuetype}
                    disabled={true}
                    value={initialValue.issuetype}
                    getOptionSelected={(option, value) => {
                      return value.issuetype === option.issuetype
                    }}
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      // console.log('value', value)
                      setFieldValue('issuetype', value);
                      var i = initialValue;
                      i.issuetype = value;
                      setInitialValue(i)
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select a issue Type"
                        variant="outlined"
                        name="issuetype"
                      />
                    )}
                    name="issuetype"
                  />
                </FormControl>
              </Grid>}

            {localStorage.getItem('AgentType') === 'Inbound' ?
              <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
                  <Autocomplete
                    options={categories}
                    getOptionLabel={option => typeof option === 'string' ? option : option.category}
                    value={initialValue.category}
                    disabled={false}
                    getOptionSelected={(option, value) => {
                      return value.label === option.label
                    }}
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      setFieldValue('category', value);
                      var i = initialValue;
                      i.category = value;
                      setInitialValue(i)
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select a Partner name"
                        variant="outlined"
                        name="partnername"
                      />
                    )}
                    name="partnername"
                  />
                </FormControl>
              </Grid> : <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
                  <Autocomplete
                    options={categories}
                    getOptionLabel={option => typeof option === 'string' ? option : option.category}
                    value={initialValue.category}
                    disabled={true}
                    getOptionSelected={(option, value) => {
                      return value.label === option.label
                    }}
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      setFieldValue('category', value);
                      var i = initialValue;
                      i.category = value;
                      setInitialValue(i)
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select a Partner name"
                        variant="outlined"
                        name="partnername"
                      />
                    )}
                    name="partnername"
                  />
                </FormControl>
              </Grid>}

            {localStorage.getItem('AgentType') === 'Inbound' ?
              <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
                  <Autocomplete
                    options={seccategories}
                    getOptionLabel={option => typeof option === 'string' ? option : option.secCategory}
                    value={initialValue.seccategory}
                    disabled={false}
                    getOptionSelected={(option, value) => {
                      return value.label === option.label
                    }}
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setFieldValue('seccategory', value);
                        var i = initialValue;
                        i.seccategory = value;
                        setInitialValue(i)
                        setfinalsubCategories([])
                        const result = subCategories.filter(data => data.secCategoryid === value._id);
                        console.log(result);
                        setfinalsubCategories(result);
                      }
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select Tag"
                        variant="outlined"
                        name="tag"
                      />
                    )}
                    name="tag"
                  />
                </FormControl>
              </Grid> : <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
                  <Autocomplete
                    options={seccategories}
                    getOptionLabel={option => typeof option === 'string' ? option : option.secCategory}
                    value={initialValue.seccategory}
                    disabled={true}
                    getOptionSelected={(option, value) => {
                      return value.label === option.label
                    }}
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setFieldValue('seccategory', value);
                        var i = initialValue;
                        i.seccategory = value;
                        setInitialValue(i)
                        setfinalsubCategories([])
                        const result = subCategories.filter(data => data.secCategoryid === value._id);
                        console.log(result);
                        setfinalsubCategories(result);
                      }
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select Tag"
                        variant="outlined"
                        name="tag"
                      />
                    )}
                    name="tag"
                  />
                </FormControl>
              </Grid>}

            {localStorage.getItem('AgentType') === 'Inbound' ?
              <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
                  <Autocomplete
                    options={finalsubCategories}
                    getOptionLabel={option => typeof option === 'string' ? option : option.subCategory}
                    value={initialValue.subcategory}
                    disabled={false}
                    getOptionSelected={(option, value) => {
                      return value.label === option.label
                    }}
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      console.log('event', value)
                      if (value !== null) {
                        setFieldValue('subcategory', value);
                        var i = initialValue;
                        i.subcategory = value;
                        setInitialValue(i)
                        sefinalsecSubCategories([]);
                        const result = secSubCategories.filter(data => data.subCategoryid === value._id);
                        console.log('result', result)
                        sefinalsecSubCategories(result);
                      }
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select a Sub-Tag 1"
                        variant="outlined"
                        name="subtag1"
                      />
                    )}
                    name="subtag1"
                  />
                </FormControl>
              </Grid> : <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
                  <Autocomplete
                    options={finalsubCategories}
                    getOptionLabel={option => typeof option === 'string' ? option : option.subCategory}
                    value={initialValue.subcategory}
                    disabled={true}
                    getOptionSelected={(option, value) => {
                      return value.label === option.label
                    }}
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      console.log('event', value)
                      if (value !== null) {
                        setFieldValue('subcategory', value);
                        var i = initialValue;
                        i.subcategory = value;
                        setInitialValue(i)
                        sefinalsecSubCategories([]);
                        const result = secSubCategories.filter(data => data.subCategoryid === value._id);
                        console.log('result', result)
                        sefinalsecSubCategories(result);
                      }
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select a Sub-Tag 1"
                        variant="outlined"
                        name="subtag1"
                      />
                    )}
                    name="subtag1"
                  />
                </FormControl>
              </Grid>
            }

            {localStorage.getItem('AgentType') === 'Inbound' ?
              <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
                  <Autocomplete
                    options={finalsecSubCategories}
                    getOptionLabel={option => typeof option === 'string' ? option : option.secSubCategory}
                    value={initialValue.secsubcategory}
                    disabled={false}
                    getOptionSelected={(option, value) => {
                      return value.label === option.label
                    }}
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      setFieldValue('secsubcategory', value);
                      var i = initialValue;
                      i.secsubcategory = value;
                      setInitialValue(i)
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select a Sub-Tag 2"
                        variant="outlined"
                        name="subtag2"
                      />
                    )}
                    name="subtag2"
                  />
                </FormControl>
              </Grid> : <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
                  <Autocomplete
                    options={finalsecSubCategories}
                    getOptionLabel={option => typeof option === 'string' ? option : option.secSubCategory}
                    value={initialValue.secsubcategory}
                    disabled={true}
                    getOptionSelected={(option, value) => {
                      return value.label === option.label
                    }}
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      setFieldValue('secsubcategory', value);
                      var i = initialValue;
                      i.secsubcategory = value;
                      setInitialValue(i)
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select a Sub-Tag 2"
                        variant="outlined"
                        name="subtag2"
                      />
                    )}
                    name="subtag2"
                  />
                </FormControl>
              </Grid>}
            {localStorage.getItem('AgentType') === 'Inbound' ?
              <Grid item xs={4} sm={4}>
                <Field
                  className={classes.fieldContainer}
                  name="comments"
                  component={TextField}
                  variant="outlined"
                  multiline
                  rows={2}
                  label="Comments"
                />
              </Grid> : <Grid item xs={4} sm={4}>
                <Field
                  className={classes.fieldContainer}
                  name="comments"
                  component={TextField}
                  variant="outlined"
                  multiline
                  rows={2}
                  label="Comments"
                />
              </Grid>}
            {localStorage.getItem('AgentType') === 'Inbound' ?
              <Grid item>

                <Field component={RadioGroup} name="type" row>
                  <FormControlLabel
                    value="open"
                    control={<Radio />}
                    label="Open"
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value="closed"
                    control={<Radio />}
                    label="Closed"
                    onChange={handleChange}

                  />
                  <FormControlLabel
                    value="disconnected"
                    control={<Radio />}
                    label="disconnected"
                    onChange={handleChange}

                  />
                </Field>
              </Grid> : <Grid item>

                <Field component={RadioGroup} name="type" row>
                  <FormControlLabel
                    value="open"
                    control={<Radio />}
                    label="Open"
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value="closed"
                    control={<Radio />}
                    label="Closed"
                    onChange={handleChange}

                  />
                  <FormControlLabel
                    value="disconnected"
                    control={<Radio />}
                    label="disconnected"
                    onChange={handleChange}

                  />
                </Field>
              </Grid>}
          </Grid>
          <br />

          <span>  </span>
          <span> </span>
          <span> </span>
          <span> </span>
          <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6}>
              <Button color="primary" variant="contained" onClick={handleSubmit} disabled={disable}>
                Submit
          </Button>&nbsp;
          </Grid>
            {/* <Grid item xs={6} sm={6}>
              <Checkbox
                checked={takebreak}
                onChange={onChangeTakebreak}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              /> Would like to take break after this call
            </Grid> */}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
