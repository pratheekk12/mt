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
      "issuetype": "Tapstart"
    },
    {
      "issuetype": "MUSKMELON"
    },
    {
      "issuetype": "HDBFS"
    },
    {
      "issuetype": "CREDIT SAISON"
    },
    {
      "issuetype": "RBL"
    },
    {
      "issuetype": "INCRED"
    },
  ]);
  const [categories, setCategories] = useState([
    {
      "_id": "6019329a4d1d476d4ee4707c",
      "category": "Positive",
      "createdAt": "2021-02-02T11:08:10.879Z",
      "updatedAt": "2021-02-02T11:08:10.879Z",
      "__v": 0
    },
    {
      "_id": "601947384d1d476d4ee4714c",
      "category": "Negative",
      "createdAt": "2021-02-02T12:36:08.951Z",
      "updatedAt": "2021-02-02T12:36:08.951Z",
      "__v": 0
    },
    {
      "_id": "601947384d1d476d4ee4715c",
      "category": "Hold",
      "createdAt": "2021-02-02T12:36:08.951Z",
      "updatedAt": "2021-02-02T12:36:08.951Z",
      "__v": 0
    },
    {
      "_id": "601947384d1d476d4ee4716c",
      "category": "Already Positive",
      "createdAt": "2021-02-02T12:36:08.951Z",
      "updatedAt": "2021-02-02T12:36:08.951Z",
      "__v": 0
    },
    {
      "_id": "601947384d1d476d4ee4717c",
      "category": "Details not Found",
      "createdAt": "2021-02-02T12:36:08.951Z",
      "updatedAt": "2021-02-02T12:36:08.951Z",
      "__v": 0
    },
  ]);
  const [seccategories, setSecCategories] = useState([
    {
      "_id": "601933d74d1d476d4ee47087",
      "categoryid": "601947384d1d476d4ee4715c",
      "secCategory": "Hold",
      "createdAt": "2021-02-02T11:13:27.814Z",
      "updatedAt": "2021-02-02T11:13:27.814Z",
      "__v": 0
    },
    {
      "_id": "601933e74d1d476d4ee47088",
      "categoryid": "601947384d1d476d4ee4715c",
      "secCategory": "Negative",
      "createdAt": "2021-02-02T11:13:43.140Z",
      "updatedAt": "2021-02-02T11:13:43.140Z",
      "__v": 0
    },
    {
      "_id": "601933f44d1d476d4ee47089",
      "categoryid": "601947384d1d476d4ee4716c",
      "secCategory": "Positive",
      "createdAt": "2021-02-02T11:13:56.707Z",
      "updatedAt": "2021-02-02T11:13:56.707Z",
      "__v": 0
    },
    {
      "_id": "601933f44d1d476d4ee47089",
      "categoryid": "601947384d1d476d4ee4717c",
      "secCategory": "Already Positive",
      "createdAt": "2021-02-02T11:13:56.707Z",
      "updatedAt": "2021-02-02T11:13:56.707Z",
      "__v": 0
    },
    {
      "_id": "601933f44d1d476d4ee47089",
      "categoryid": "601947384d1d476d4ee4718c",
      "secCategory": "Details not Found",
      "createdAt": "2021-02-02T11:13:56.707Z",
      "updatedAt": "2021-02-02T11:13:56.707Z",
      "__v": 0
    },

  ]);
  const [finalsubCategories, setfinalsubCategories] = useState([])
  const [subCategories, setSubCategories] = useState([

    {
      "_id": "601936184d1d476d4ee4709f",
      "secCategoryid": "601933d74d1d476d4ee47087",
      "subCategory": "Call Disconnected",
      "createdAt": "2021-02-02T11:23:04.642Z",
      "updatedAt": "2021-02-02T11:23:04.642Z",
      "__v": 0
    },
    {
      "_id": "601936214d1d476d4ee470a0",
      "secCategoryid": "601933d74d1d476d4ee47087",
      "subCategory": "Busy",
      "createdAt": "2021-02-02T11:23:13.853Z",
      "updatedAt": "2021-02-02T11:23:13.853Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933d74d1d476d4ee47087",
      "subCategory": "Call Back",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "Interest Rate",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "Need Low amount",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "Need High Tenure",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "Need Low Tenure",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "Docs Not available",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "Availed from other sources",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "Delay in Call",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "Money Not required Now",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "Just Checking App",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "Others",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "High Line setup fee",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "High Processing Fee",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },
    {
      "_id": "6019362c4d1d476d4ee470a1",
      "secCategoryid": "601933e74d1d476d4ee47088",
      "subCategory": "Unhappy with Service",
      "createdAt": "2021-02-02T11:23:24.484Z",
      "updatedAt": "2021-02-02T11:23:24.484Z",
      "__v": 0
    },

  ]);
  const [finalsecSubCategories, sefinalsecSubCategories] = useState([])
  const [secSubCategories, setSecSubCategories] = useState([]);

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

  }


  const handleBreak = (e) => {
    var axios = require('axios');
    const AgentSIPID = localStorage.getItem('AgentSIPID')

    // const AgentSIPID = localStorage.getItem('AgentSIPID')

    var axios = require('axios');
    var config = {
      method: 'get',
      url: `http://192.168.3.36:33003/ami/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${AgentSIPID}&Reason=AgentDisposed&Break=false`,
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
    // data.CRMDISPOSITION =data
    data = { "CRMDISPOSITION": data };
    console.log("data", data)
    var config = {
      method: 'put',
      url: `http://192.168.3.36:52001/api/interactions/${id}`,
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
      "Partner Name": formRef.current.values.issuetype.issuetype,
      "Disposition": secCategory,
      "Reason": subCategory
    }

    console.log(data)

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
          .required('Please select a  Partner')
          .typeError('Please select a  Partner'),

        seccategory: yup
          .object()
          .required('Please select a  Disposition')
          .typeError('Please select a valid  Disposition'),
        subcategory: yup
          .object()
          .required('Please select a  Reason')
          .typeError('Please select a valid  Reason'),



      })}
    >
      {({ setFieldValue }) => (
        <Form>
          <Grid container spacing={2} direction="row">
            {/* {localStorage.getItem('AgentType') === 'Inbound' ? <Grid item xs={4} sm={4}>
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
            </Grid>} */}
            {/* {localStorage.getItem('AgentType') === 'Inbound' ?
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
              </Grid>} */}

            {/* {localStorage.getItem('AgentType') === 'Inbound' ?
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
              </Grid>} */}

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
                        label="Select Partner Name"
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

            {/* {localStorage.getItem('AgentType') === 'Inbound' ?
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
                        label="Disposition"
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
              </Grid>} */}

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
                        label="Disposition"
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
                        label="Reason"
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

            {/* {localStorage.getItem('AgentType') === 'Inbound' ?
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
              </Grid>} */}
            {/* {localStorage.getItem('AgentType') === 'Inbound' ?
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
              </Grid>} */}
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
