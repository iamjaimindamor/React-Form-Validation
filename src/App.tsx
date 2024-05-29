import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function App() {

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange", ////#1 ////stratey before submit or while form filling
    // mode: "onTouched", ////#2 ////stratey before submit or while form filling
    reValidateMode: "onChange", ////strategy mode after the submit event
    defaultValues: {
      Firstname: "",
      Lastname: "",
      Username: "",
      Email: "",
      Password: "",
      Age: "",
    },
  });

  const [formCheck, SetFormCheck] = useState(true);

  const handleCheck = () => {
    if (
      (errors.Firstname == undefined &&
        errors.Lastname == undefined && ////#1 button color change before using onBlur in register API call
        errors.Password == undefined &&
        errors.Email == undefined &&
        errors.Username == undefined &&
        errors.Age == undefined) == true &&
      dirtyFields.Firstname &&
      dirtyFields.Lastname &&
      dirtyFields.Password &&
      dirtyFields.Age &&
      dirtyFields.Email &&
      dirtyFields.Username
    ) {
      SetFormCheck(true);
    } else {
      SetFormCheck(false);
    }
  };
  
  const [checkVisibilityOn, SetVisibilityOn] = useState(false);

  const handleVisiblity = () => {
    SetVisibilityOn(!checkVisibilityOn);
  };

  return (
    <>
    
      <div className="d-flex justify-content-center">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          // onChange={handleCheck} // //checking at every input if all field are valid to success color for button   #1 iterations {NOT REQUIRED in #3 iteration }
          onFocus={handleCheck} // //for submit button to turn red on click                                        #1
          onKeyUp={handleCheck} // //for evaluating every input value after it is typed in that is onKeyDown and check the error on KeyUp #3rd iteration optimezed
        >
          <h2 className="d-flex justify-content-center display-2">Sign Up!</h2>
          <br />
          <div className="row">
            <div className="col">
              <TextField
                className="required"
                fullWidth
                required
                {...register("Firstname", {
                  required: "Firstname Is Missing",
                  minLength: { value: 3, message: "Min. Length Must Be 3" },
                  maxLength: { value: 20, message: "Max. Length Must Be 20" },
                  pattern: {
                    value: /^\w+/,
                    message: "Enter Only Characters",
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {errors.Firstname == undefined &&
                        dirtyFields.Firstname && <span>&#x2705; </span>}
                    </InputAdornment>
                  ),
                }}
                error={errors.Firstname != undefined}
                id="01"
                label="Firstname"
              />
              <p className="error">{errors.Firstname?.message}</p>
            </div>

            <div className="col">
              <TextField
                className="required"
                fullWidth
                {...register("Lastname", {
                  minLength: {
                    value: 3,
                    message: "Min. Length for name Must Be 3",
                  },
                  maxLength: { value: 20, message: "Max. Length Must Be 20" },
                  pattern: {
                    value: /^\w+/,
                    message: "Enter Only Characters",
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {errors.Lastname == undefined && dirtyFields.Lastname && (
                        <span>&#x2705;</span>
                      )}
                    </InputAdornment>
                  ),
                }}
                error={errors.Lastname != undefined}
                id="02"
                label="Lastname"
              />
              <p className="error">{errors.Lastname?.message}</p>

              <br />
            </div>
          </div>

          <TextField
            className="required"
            required
            fullWidth
            {...register("Username", {
              required: "Username Is Required",
              minLength: {
                value: 3,
                message: "Username length must greater than 3",
              },
              maxLength: { value: 20, message: "Maximum Valid Length is 20" },
              pattern: {
                value: /^[A-Za-z][A-Za-z0-9_]{3,20}$/,
                message: "Only Character , digits ,'_' are allowed ",
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  {errors.Username == undefined && dirtyFields.Username && (
                    <span>&#x2705;</span>
                  )}
                </InputAdornment>
              ),
            }}
            error={errors.Username != undefined}
            id="03"
            label="Username"
          />

          <p className="error">{errors.Username?.message}</p>

          {/* {errors.Username == undefined && dirtyFields.Username ? (
            <p>&#x2705;</p>
          ) : (
            <p className="error">{errors.Username?.message}</p>
          )} */}

          <br />

          <TextField
            className="required"
            type="email"
            required
            fullWidth
            {...register("Email", {
              required: "Email Is Required",
              pattern: {
                value: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                message: "Enter a Valid Email Address",
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {errors.Email == undefined && dirtyFields.Email && (
                    <span>&#x2705;</span>
                  )}
                </InputAdornment>
              ),
            }}
            error={errors.Email != undefined}
            id="04"
            label="Email"
          />
          <p className="error">{errors.Email?.message}</p>

          {/*errors.Email == undefined && dirtyFields.Email ? (
            <p>&#x2705;</p>                          //1st error iteration shows form field Checked at bottom  ` 
          ) : (
            <p className="error">{errors.Email?.message}</p>
          )} */}

          <br />

          <TextField
            className="required"
            required
            type={checkVisibilityOn ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <>
                  <InputAdornment position="end">
                    {" "}
                    {errors.Password == undefined && dirtyFields.Password && (
                      <span>&#x2705;</span>
                    )}
                  </InputAdornment>
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="toggle password visibility"
                      onClick={handleVisiblity}
                    >
                      {checkVisibilityOn ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                </>
              ),
            }}
            fullWidth
            {...register("Password", {
              required: "Password Is Must",
              minLength: {
                value: 6,
                message: "Password Length Must Greater than 6",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                message:
                  "Password Must Contains atleast one digit, one Capital Letter and one Small Letter",
              },
            })}
            error={errors.Password != undefined}
            id="05"
            label="Password"
          />

          <p className="error">{errors.Password?.message}</p>
          {/* {errors.Password == undefined && dirtyFields.Password ? (
            <p>&#x2705;</p>
          ) : (
            <p className="error">{errors.Password?.message}</p>
          )} */}

          <br />

          <TextField
            className="required"
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {errors.Age == undefined && dirtyFields.Age && (
                    <span>&#x2705;</span>
                  )}
                </InputAdornment>
              ),
            }}
            fullWidth
            {...register("Age", {
              min: { value: 14, message: "Minimum Age Requirement is 14" },
              max: {
                value: 80,
                message: "Maximum Age Can Be 80 eligible for registeration",
              },
            })}
            error={errors.Age != undefined}
            id="06"
            label="Age"
          />

          <p className="error">{errors.Age?.message}</p>

          {/* {errors.Age == undefined && dirtyFields.Age ? (
            <p>&#x2705;</p>
          ) : (
            <p className="error">{errors.Age?.message}</p>
          )} */}

          <Button
            color={formCheck ? "success" : "error"}
            fullWidth
            type="submit"
            variant="outlined"
          >
            Submit
          </Button>
        </form>
      </div>

      <br />

      <pre className="d-flex justify-content-center required">
        <b>Crafted with </b>
        <span color="danger"> &hearts; </span>
        <i> By Jaimin</i>
      </pre>
    </>
  );
}

export default App;
