# Exception Handling

In this module we will:
* Implement industry-standard exception handling including user-friendly exception messages
* Implement exception handling using a variety of Java constructs
* Use data validation annotations to verify data prior to processing the data
* Implement custom Swagger Documentation
* Gather and use data from other APIs

## Learn to implement industry-standard exception handling including user-friendly exception messages

Exceptions are disruptions to the ordinary flow of applications including:

### Application Error
* File or environment variable we seek is not found
* API tries an invalid math expression
* API loses accesses to webserver

### User Error
* Looking for resources that aren't available
* Using endpoint that doesn't exist
* Sending API wrong data type

Spring Boot has a default way of handling exceptions. What if we wanted to provide some custom error messages when our program encounters an error and we want to handle exceptions that differ from the Spring Boot Default? Applications experience two types of exceptions:

### System generated
* Something happened we weren't expecting
* Client sent String value when we were expecting an integer

### Thrown exceptions
* Something happened we expected, we reported manually by “throwing” an exception
* Client looked for resource that wasn't available

When we are writing our custom exception handles we need to handle both types. We also need a way to report information back to the client in a standard way. Our client need only address one type of error message. We need to let the client know:

* What is the exception
* What caused the exception
* What time the exception happened
* Any data types that are incorrect or missing
* Among other information that might vary by exception type

When an exception happens, it is considered thrown. We throw a `ResourceNotFound` exception. The system throws a `FileNotFound` exception. When we handle an exception, it is considered caught. We will catch any thrown exceptions. We'll “catch” all possible exceptions and report to the client what happened.

Spring Boot will handle continuing the application causing it to wait for the next request. We take advantage of annotations to control the flow of our programs and the object orientedness of Java to make our code reusable. Pay attention to the flow of the application.

Open up the application `exceptionalsampleemp-initial` from the GitHub Repository https://github.com/LambdaSchool/java-exceptionalsampleemps.git. This application is the same as the application from https://github.com/LambdaSchool/java-sampleemps.git/sampleemps_data_modeling with the addition of find employee by id endpoints and associated code.

Run the application and surf to these endpoints to see what default exception handling looks like. You can expand each endpoint to see its output

Wrong Data Type: http://localhost:2019/employees/employee/lambda

```javascript
{
    "timestamp": "2020-05-20 17:32:14",
    "status": 400,
    "error": "Bad Request",
    "message": "Failed to convert value of type 'java.lang.String' to required type 'long'; nested exception is java.lang.NumberFormatException: For input string: \"lambda\"",
    "trace": "org.springframework.web.method.annotation.MethodArgumentTypeMismatchException: Failed to convert value of type 'java.lang.String' to required type 'long'; nested exception is java.lang.NumberFormatException: For input string: \"lambda\"\n\tat org.springframework.web.method.annotation.AbstractNamedValueMethodArgumentResolver.resolveArgument(AbstractNamedValueMethodArgumentResolver.java:133)\n\tat org.springframework.web.method.support.HandlerMethodArgumentResolverComposite.resolveArgument(HandlerMethodArgumentResolverComposite.java:121)\n\tat org.springframework.web.method.support.InvocableHandlerMethod.getMethodArgumentValues(InvocableHandlerMethod.java:167)\n\tat org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:134)\n\tat org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:106)\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:888)\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:793)\n\tat org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)\n\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1040)\n\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:943)\n\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1006)\n\tat org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:898)\n\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:634)\n\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:883)\n\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:741)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:53)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:202)\n\tat org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96)\n\tat org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:526)\n\tat org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:139)\n\tat org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:92)\n\tat org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74)\n\tat org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:343)\n\tat org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:367)\n\tat org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:65)\n\tat org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:860)\n\tat org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1591)\n\tat org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)\n\tat org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)\n\tat java.base/java.lang.Thread.run(Thread.java:834)\nCaused by: java.lang.NumberFormatException: For input string: \"lambda\"\n\tat java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)\n\tat java.base/java.lang.Long.parseLong(Long.java:692)\n\tat java.base/java.lang.Long.valueOf(Long.java:1144)\n\tat org.springframework.util.NumberUtils.parseNumber(NumberUtils.java:214)\n\tat org.springframework.beans.propertyeditors.CustomNumberEditor.setAsText(CustomNumberEditor.java:115)\n\tat org.springframework.beans.TypeConverterDelegate.doConvertTextValue(TypeConverterDelegate.java:429)\n\tat org.springframework.beans.TypeConverterDelegate.doConvertValue(TypeConverterDelegate.java:402)\n\tat org.springframework.beans.TypeConverterDelegate.convertIfNecessary(TypeConverterDelegate.java:155)\n\tat org.springframework.beans.TypeConverterSupport.convertIfNecessary(TypeConverterSupport.java:73)\n\tat org.springframework.beans.TypeConverterSupport.convertIfNecessary(TypeConverterSupport.java:53)\n\tat org.springframework.validation.DataBinder.convertIfNecessary(DataBinder.java:693)\n\tat org.springframework.web.method.annotation.AbstractNamedValueMethodArgumentResolver.resolveArgument(AbstractNamedValueMethodArgumentResolver.java:125)\n\t... 47 more\n",
    "path": "/employees/employee/lambda"
}
```

Employee Not Found: http://localhost:2019/employees/employee/9999

```javascript
{
    "timestamp": "2020-05-20 17:35:09",
    "status": 500,
    "error": "Internal Server Error",
    "message": "Employee id 9999 not found",
    "trace": "javax.persistence.EntityNotFoundException: Employee id 9999 not found\n\tat com.lambdaschool.sampleemps.services.EmployeeServiceImpl.lambda$findEmployeeById$0(EmployeeServiceImpl.java:35)\n\tat java.base/java.util.Optional.orElseThrow(Optional.java:408)\n\tat com.lambdaschool.sampleemps.services.EmployeeServiceImpl.findEmployeeById(EmployeeServiceImpl.java:35)\n\tat com.lambdaschool.sampleemps.services.EmployeeServiceImpl$$FastClassBySpringCGLIB$$4105708a.invoke(<generated>)\n\tat org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:769)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:747)\n\tat org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:366)\n\tat org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:99)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:747)\n\tat org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:689)\n\tat com.lambdaschool.sampleemps.services.EmployeeServiceImpl$$EnhancerBySpringCGLIB$$b166ea5a.findEmployeeById(<generated>)\n\tat com.lambdaschool.sampleemps.controllers.EmployeeController.getEmployeeById(EmployeeController.java:37)\n\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\n\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\n\tat java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\n\tat java.base/java.lang.reflect.Method.invoke(Method.java:566)\n\tat org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:190)\n\tat org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:138)\n\tat org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:106)\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:888)\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:793)\n\tat org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)\n\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1040)\n\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:943)\n\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1006)\n\tat org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:898)\n\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:634)\n\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:883)\n\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:741)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:53)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\n\tat org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:202)\n\tat org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96)\n\tat org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:526)\n\tat org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:139)\n\tat org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:92)\n\tat org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74)\n\tat org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:343)\n\tat org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:367)\n\tat org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:65)\n\tat org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:860)\n\tat org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1591)\n\tat org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)\n\tat org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)\n\tat java.base/java.lang.Thread.run(Thread.java:834)\n",
    "path": "/employees/employee/9999"
}
```

Invalid endpoint: http://localhost:2019/employees/turtle

```javascript
{
    "timestamp": "2020-05-20 17:35:38",
    "status": 404,
    "error": "Not Found",
    "message": "No message available",
    "path": "/employees/turtle"
}
```

There is nothing wrong with this output but we can provide more meaningful output to our clients.

## Set up our Models

Let’s add the models needed to report exception, error messages back to the client. You can modify these as you wish for your applications. Add a model called `ErrorDetail` using the following code. This is not annotated as an Entity. The data for this model will never appear in the database. This is a POJO we are using internally in our application.

```java
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ErrorDetail
{
    private String title;

    private int status;
    private String detail;
    private Date timestamp;
    private String developerMessage;
    private List<ValidationError> errors = new ArrayList<>();

    public ErrorDetail()
    {
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public int getStatus()
    {
        return status;
    }

    public void setStatus(int status)
    {
        this.status = status;
    }

    public String getDetail()
    {
        return detail;
    }

    public void setDetail(String detail)
    {
        this.detail = detail;
    }

    public Date getTimestamp()
    {
        return timestamp;
    }

    public void setTimestamp(Date timestamp)
    {
        this.timestamp = timestamp;
    }

    public String getDeveloperMessage()
    {
        return developerMessage;
    }

    public void setDeveloperMessage(String developerMessage)
    {
        this.developerMessage = developerMessage;
    }

    public List<ValidationError> getErrors()
    {
        return errors;
    }

    public void setErrors(List<ValidationError> errors)
    {
        this.errors = errors;
    }
}
```

`ErrorDetail` references `ValidationError`. This is a class we create to hold any data validation errors that arise. This isn't the `ValidationErrors` from the Spring Framework so don’t mistakenly import that class! Add the `ValidationError` models using the following code. This isn't annotated as an Entity. The data for this model will never appear in the database. This is a POJO we are using internally in our application.

```java
public class ValidationError
{
    private String Code;
    private String message;

    public String getCode()
    {
        return Code;
    }

    public void setCode(String code)
    {
        Code = code;
    }

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }

    @Override
    public String toString()
    {
        return "ValidationError{" + "Code='" + Code + '\'' + ", message='" + message + '\'' + '}';
    }
}
```

## Turn off Default Exception Handling

We need to turn off the default exception handling of the Spring Framework through an application property. After turning it off we need to handle all exceptions and report the information to the client.

### Application Properities

This code turns off default exception handling including handling incorrect endpoints. This will allow us to create custom exception handling. The default exception handling is still present but uses our own customizations. That is what we mean by “turn off” default exception handling. We also need to turn static resource handling to capture unknown endpoints. Add the following to `application.properties`:

```
### Turns off Spring Boot automatic exception handling
server.error.whitelabel.enabled=false
spring.mvc.throw-exception-if-no-handler-found=true
spring.resources.add-mappings=false
```

### Mapping for Swagger

Since we have turned off static resource handling, we need to manually add the static paths for Swagger, the only valid static paths in our application. Add a class under `config` called `SwaggerWebMVC`. Add the following code to the class. This is boilerplate code that needs to be added to any application that uses custom exception handling and Swagger.

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * The application turns off any automatic web page generate done by Spring. This is done to improve exception handling.
 * However, we do need some web page generate done for Swagger, so we do that here.
 */
@Configuration
public class SwaggerWebMVC implements WebMvcConfigurer
{
    /**
     * Adds the Swagger web pages to Spring.
     * This still gives the following warning
     * <p>
     * No mapping for GET /
     * No mapping for GET /csrf
     * <p>
     * All works though
     *
     * @param registry the place that holds the web pages for Spring
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry)
    {
        registry.addResourceHandler("swagger-ui.html")
            .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
            .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
```

### Manual/error endpoint handling

We have turned off default error handling. Now let’s handle the exceptions. Some errors get routed to the endpoint `/error`. We need to change what /error reports to the client to our format. Create a new subpackage under `sampleemps` called `exceptions`. Under that subpackge create a class called `CustomErrorDetails`. Then add the following code to that class. If future applications, you would modify what gets reported here to match what is in the `ErrorDetail` class. That way all our exceptions will report the same format of messages! Be careful that you import the right class for `DefaultErrorAttributes`.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class CustomErrorDetails
        extends DefaultErrorAttributes
{
    @Autowired
    private HelperFunctions helper;

    @Override
    public Map<String, Object> getErrorAttributes(
            WebRequest webRequest,
            boolean includeStackTrace)
    {

        //Get all the normal error information
        Map<String, Object> errorAttributes =
                super.getErrorAttributes(webRequest, includeStackTrace);
        // Linked HashMaps maintain the order the items are inserted. I am using it here so that the error JSON
        // produced from this class lists the attributes in the same order as other classes.
        Map<String, Object> errorDetails = new LinkedHashMap<>();
        errorDetails.put("title", errorAttributes.get("error"));
        errorDetails.put("status", errorAttributes.get("status"));
        errorDetails.put("detail", errorAttributes.get("message"));
        errorDetails.put("timestamp", errorAttributes.get("timestamp"));
        errorDetails.put("developerMessage", "path: " + errorAttributes.get("path"));

        errorDetails.put("errors", helper.getConstraintViolation(this.getError(webRequest)));
        return errorDetails;
    }
}
```

This class uses a HelperFunction class. This class contains helpful methods that are used throughout the application. We will create a method that populates the validation constraint errors. We will use such a function in a few places throughout the application. Create a new subpackage under `sampleemps` called `handlers`. Create a class in that subpackage called `HelperFunctions`. Add the following code to that class.

```java
import com.lambdaschool.sampleemps.models.ValidationError;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;

@Component
public class HelperFunctions
{
    public List<ValidationError> getConstraintViolation(Throwable cause)
    {
        // Find any data violations that might be associated with the error and report them
        // data validations get wrapped in other exceptions as we work through the Spring
        // exception chain. Hence we have to search the entire Spring Exception Stack
        // to see if we have any violation constraints.
        while ((cause != null) && !(cause instanceof ConstraintViolationException))
        {
            cause = cause.getCause();
        }

        List<ValidationError> listVE = new ArrayList<>();

        // we know that cause either null or an instance of ConstraintViolationException
        if (cause != null)
        {
            ConstraintViolationException ex = (ConstraintViolationException) cause;
            for (ConstraintViolation cv : ex.getConstraintViolations())
            {
                ValidationError newVe = new ValidationError();
                newVe.setCode(cv.getInvalidValue()
                    .toString());
                newVe.setMessage(cv.getMessage());
                listVE.add(newVe);
            }
        }
        return listVE;
    }
}
```

Run the application and surf to these endpoints to see what exception handling now looks like. You can expand each endpoint to see its output

Wrong Data Type: http://localhost:2019/employees/employee/lambda

```javascript
{
    "title": "Bad Request",
    "status": 400,
    "detail": "Failed to convert value of type 'java.lang.String' to required type 'long'; nested exception is java.lang.NumberFormatException: For input string: \"lambda\"",
    "timestamp": "2020-05-20 17:41:56",
    "developerMessage": "path: /employees/employee/lambda",
    "errors": []
}
```

Employee Not Found: http://localhost:2019/employees/employee/9999

```javascript
{
    "title": "Internal Server Error",
    "status": 500,
    "detail": "Employee id 9999 not found",
    "timestamp": "2020-05-20 17:43:15",
    "developerMessage": "path: /employees/employee/9999",
    "errors": []
}
```

Invalid endpoint: http://localhost:2019/employees/turtle

```javascript
{
    "title": "Not Found",
    "status": 404,
    "detail": "No message available",
    "timestamp": "2020-05-20 17:44:15",
    "developerMessage": "path: /employees/turtle",
    "errors": []
}
```

There is nothing wrong with this output but we can still do better. We get more specific about each type of error.

### Unpredicted Exceptions

Let’s change the message that get returned when we encounter an exception we have not handled, a catch all for all exceptions! Under the `handlers` subpackage, add a class called `RestExceptionHandler`. Here we will put code to address specific types of errors. Add the following code to the class to better handle invalid endpoint exceptions. This class extends the abstract class `ResponseEntityExceptionHandler`. We will override some methods from this abstract while leaving others at their default implementation.

Note the `RestControllerAdvice` annotation. When an exception is encountered during a Rest Controller operation, that Rest Controller seeks advice from an advice class on how to handle that exception. If no advice is found, it uses the default exception handling built into Spring including the modifications we have made to that default exception handling.

We do use the helper function to fill in data validation constraint exceptions so need to autowire that in!

```java
import com.lambdaschool.sampleemps.models.ErrorDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

/**
 * This is the driving class when an exception occurs. All exceptions are handled here.
 * This class is shared across all controllers due to the annotation RestControllerAdvice;
 * this class gives advice to all controllers on how to handle exceptions.
 * Due to the annotation Order(Ordered.HIGHEST_PRECEDENCE), this class takes precedence over all other controller advisors.
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class RestExceptionHandler
        extends ResponseEntityExceptionHandler
{
    @Autowired
    private HelperFunctions helper;

    /**
     * The constructor for the RestExceptionHandler. Currently we do not do anything special. We just call the parent constructor.
     */
    public RestExceptionHandler()
    {
        super();
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(
            Exception ex,
            Object body,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date());
        errorDetail.setStatus(status.value());
        errorDetail.setTitle("Rest Internal Exception");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                .getName());
        errorDetail.setErrors(helper.getConstraintViolation(ex));

        return new ResponseEntity<>(errorDetail,
                null,
                status);
    }
}
```

Run the application and surf to these endpoints to see what exception handling now looks like. You can expand each endpoint to see its output

Wrong data type: http://localhost:2019/employees/employee/lambda

```javascript
{
    "title": "Rest Internal Exception",
    "status": 400,
    "detail": "Failed to convert value of type 'java.lang.String' to required type 'long'; nested exception is java.lang.NumberFormatException: For input string: \"lambda\"",
    "timestamp": "2020-05-20 18:03:05",
    "developerMessage": "org.springframework.web.method.annotation.MethodArgumentTypeMismatchException",
    "errors": []
}
```

Employee Not Found: http://localhost:2019/employees/employee/9999

```javascript
{
    "title": "Internal Server Error",
    "status": 500,
    "detail": "Employee id 9999 not found",
    "timestamp": "2020-05-20 18:02:44",
    "developerMessage": "path: /employees/employee/9999",
    "errors": []
}
```

Invalid endpoint: http://localhost:2019/employees/turtle

```javascript
{
    "title": "Not Found",
    "status": 404,
    "detail": "No message available",
    "timestamp": "2020-05-20 18:02:16",
    "developerMessage": "path: /employees/turtle",
    "errors": []
}
```

## Learn to implement exception handling using a variety of Java constructs

What if we want to programmatically cause an exception? What if we want to stop the ordinary flow of our application and report that to our clients? To do this, we can throw an exception or use a try..catch statement. We have already thrown built-in exceptions. For example, look at the code for delete in the class `EmployeeServiceImpl`.

```java
    public void delete(long employeeid)
    {
        if (employeerepos.findById(employeeid)
            .isPresent())
        {
            employeerepos.deleteById(employeeid);
        } else
        {
            throw new EntityNotFoundException("Employee " + employeeid + " Not Found");
        }
    }
```

Here we use `throw new EntityNotFoundException("Employee " + employeeid + " Not Found");` which throws the built-in exception `EntityNotFoundException`. In the method `findEmployeeById` we call a method called `.orElseThrow` which throws the `EntityNotFoundException` as well.

```java
    public Employee findEmployeeById(long id) throws
            EntityNotFoundException
    {
        return employeerepos.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee id " + id + " not found"));
    }
```

Java also includes the Try..Catch statement. This statement tries to run the code in the body. If all works, great! If not an exception is thrown, either by us, Java, or the Spring Framework, and the catch part gets executed. You can even have a finally part that will get executed no matter what.

```java
try
{
    // the statements to try
} catch (Exception e)
{
    // do this is something went wrong
} finally
{
    // no matter what, do these statements
}
```

Notice that with catch we say which exception we wish to catch. Above we use Exception e to represent all exceptions. However, if we want to handle different exceptions differently, we can do that! In the following exception, we address an IOException, a SQLException and then all other exceptions differently.

```java
try
{
    // the statements to try
} catch (SQLException e)
{
    System.out.println("Error processing database");
} catch (IOException e)
{
    System.out.println("We could not find your file");
} catch (Exception e)
{
    System.out.println("Ouch. That did not work!" + e);
} finally
{
    // no matter what, do these statements
}
```

### Create our own exception

Let’s create our own exception that we can throw and look at how try..catch statements work in Java. Let’s add each example to our `exceptionalsampleemps` application we started in the previous objective.

If you haven’t already, open the application `exceptionalsampleemps` you worked on in the previous objective on Exception Handling. Let’s create our own exception we can throw. Under the subpackage `exceptions`, create a class called `ResourceNotFoundException`. This is the name of the exception we are going to create. Add the following code to that class. Remember in adding all of this code, you will need to make sure the proper imports are done!

```java
public class ResourceNotFoundException
    extends RuntimeException
{
    public ResourceNotFoundException(String message)
    {
        super("Error from a Lambda School Application " + message);
    }
}
```

The difference between this exception and the built-in exception `EntityNotFoundException` is the name and that the error message will contain the phrase “Error from a Lambda School Application”. Really, I am just showing this is possible!

Now let’s handle this custom exception. Add the following code to the bottom of the RestExceptionHandler class under the subpackage handlers.

```java
    // annotation to say the following method is meant to handle any time the ResourceNotFoundException is thrown
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException rnfe)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date());
        errorDetail.setStatus(HttpStatus.NOT_FOUND.value());
        errorDetail.setTitle("Resource Not Found");
        errorDetail.setDetail(rnfe.getMessage());
        errorDetail.setDeveloperMessage(rnfe.getClass()
            .getName());
        errorDetail.setErrors(helper.getConstraintViolation(rnfe));

        return new ResponseEntity<>(errorDetail,
            null,
            HttpStatus.NOT_FOUND);
    }
```

Thus we have an annotation saying which method will handle `ResourceNotFoundExceptions`. We put the messages we want to return to the client in our `ErrorDetail` model and then we return that object to the client. Now we have to throw the `ResourceNotFoundException` in our code instead of the `EntityNotFoundException`. So open the `EmployeeServiceImpl` and the class and do a replace, replacing `EntityNotFoundException` with `ResourceNotFoundException`. Do the same thing with `JobTitleServiceImpl`.

Hint to replace code, with the correct file selected,

* go to `Edit` -> `Find` -> `Replace`
* In the find box, the first one, enter `EntityNotFoundException`
* In the replace box, the second one, enter `ResourceNotFoundException`
* Click on Replace all

Let’s see what happens now when we try to find an employee that is not there. Run the application `exceptionalsampleemps`. Surf to the following endpoint. Expand the endpoint to see its output.

Resource Not Found: http://localhost:2019/employees/employee/9999

```javascript
{
    "title": "Resource Not Found",
    "status": 404,
    "detail": "Error from a Lambda School Application Employee id 9999 not found",
    "timestamp": "2020-05-20 19:58:39",
    "developerMessage": "com.lambdaschool.sampleemps.exceptions.ResourceNotFoundException",
    "errors": []
}
```

### Try..Catch statements

To see how a try..catch works in action, let’s try to read from an environment variable on our local system. we use a system method `System.getenv()`.

Change the main class, `SampleempsApplication`, to try and read in an environment variable called `LAMBDA`. So the main class will look like this in the end.

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SampleempsApplication
{
    public static void main(String[] args)
    {
        try
        {
            System.out.println(System.getenv("PATH").toUpperCase());
        } catch (Exception e)
        {
            System.out.println("No Such Environment Variable");
        } finally
        {
            SpringApplication.run(SampleempsApplication.class,
                    args);
        }
    }
}
```

Run the application. In your IntelliJ console, you will see the value of the environment variable in upper case if it is set on your system. If it is not set, you will see the message no such environment variable. Either way the program will continue. Try working with the environment variable PATH and see what happens! Do note you get the output twice, once from the regular run of the application and once from the DevTools run of the application.

## Learn to use data validation annotations to verify data prior to processing the data

We as backend developers are responsible for the integrity of the data in our systems. Clients will send up garbage at times. That might be due to a system problem or some initial act to sabotage our database. We cannot rely on the data we receive to be valid. We must first validate the data before it gets saved and used in our system.

* Did the client send up a String when we needed an integer?
* Did the client send us duplicates of a field that must be unique?
* Did the client send us a poorly formatted email address?

Do NOT rely on clients to send you reasonable data. Data validation is our responsibility. I think I have said that enough but know I have many horror stories of “interesting” data from clients. Validate your own data! We have been doing this all along. We just did not label it as data validation. For example

* Java is strongly typed. If we expect an integer and get a String, Java itself will cause an exception, and we know how to handle exceptions!
* We use the `@Column` annotation to say if a column is required or must be unique across records.
* We use setters to convert or validate our data before it goes to the database.

So, much data validation we get for “free” with Java Spring. Data validation is baked into the language and framework. However, certain annotations are available for use to further validate data. These are found in the import `javax.validation.constraints` and are put right before the fields in the models whose values we want to restrict. We can even add our own exception message using the `message` attribute. Some of these include:

* `@Email(message = "must be a valid email")` forces the field to be in a valid email format (username@domain.toplevel). If not, a message for “must be a valid email” is returned.
* `@Size(min = ??, max = ??)` restricts the size of a String field.
* `@Min(value = ??)` minimum value of an integer. Often used in conjunction with @Max
* `@Max(value = ??)` maximum value of an integer. Often used in conjunction with @Min
* `@DecimalMin(value = "??.??")` minimum value for doubles
* `@DecimalMax(value = "??.??")` maximum value for doubles
* `@Postive` must be a positive number
* `@Negative` must be a negative number
* `@NotNull` another way to validate whether a field can be null or not
* `@Future` date must be in the future
* `@Pattern(value = "regex")` allows you specific a regex pattern to use to validate the data! Discussing regex patterns are beyond the scope of this module. See additional resources for more information.

Open the application `exceptionalsampleemps` from the previous objectives on Exception Handling. In the Employee Model, right before the salary field, add the appropriate annotations for a minimum salary of 100,000 and a maximum salary of 120,000. So your code will look something like this. Remember in adding all of this code, you will need to make sure the proper imports are done!

```java
    @Transient
    public boolean hasvalueforsalary = false;

    @DecimalMax(value = "120000.0")
    @DecimalMin(value = "100000.0")
    private double salary;
```

Now run your application. In your console window you will see an error message similar to the following.

```
Caused by: javax.persistence.RollbackException: Error while committing the transaction
    at org.hibernate.internal.ExceptionConverterImpl.convertCommitException(ExceptionConverterImpl.java:81) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.engine.transaction.internal.TransactionImpl.commit(TransactionImpl.java:104) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.springframework.orm.jpa.JpaTransactionManager.doCommit(JpaTransactionManager.java:534) ~[spring-orm-5.2.2.RELEASE.jar:5.2.2.RELEASE]
    ... 20 common frames omitted
Caused by: javax.validation.ConstraintViolationException: Validation failed for classes [com.lambdaschool.sampleemps.models.Employee] during persist time for groups [javax.validation.groups.Default, ]
List of constraint violations:[
    ConstraintViolationImpl{interpolatedMessage='must be greater than or equal to 100000.0', propertyPath=salary, rootBeanClass=class com.lambdaschool.sampleemps.models.Employee, messageTemplate='{javax.validation.constraints.DecimalMin.message}'}
]
    at org.hibernate.cfg.beanvalidation.BeanValidationEventListener.validate(BeanValidationEventListener.java:140) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.cfg.beanvalidation.BeanValidationEventListener.onPreInsert(BeanValidationEventListener.java:80) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.action.internal.EntityInsertAction.preInsert(EntityInsertAction.java:211) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.action.internal.EntityInsertAction.execute(EntityInsertAction.java:84) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.engine.spi.ActionQueue.executeActions(ActionQueue.java:604) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.engine.spi.ActionQueue.lambda$executeActions$1(ActionQueue.java:478) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at java.base/java.util.LinkedHashMap.forEach(LinkedHashMap.java:684) ~[na:na]
    at org.hibernate.engine.spi.ActionQueue.executeActions(ActionQueue.java:475) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.event.internal.AbstractFlushingEventListener.performExecutions(AbstractFlushingEventListener.java:348) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.event.internal.DefaultFlushEventListener.onFlush(DefaultFlushEventListener.java:40) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.event.service.internal.EventListenerGroupImpl.fireEventOnEachListener(EventListenerGroupImpl.java:108) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.internal.SessionImpl.doFlush(SessionImpl.java:1344) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.internal.SessionImpl.managedFlush(SessionImpl.java:435) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.internal.SessionImpl.flushBeforeTransactionCompletion(SessionImpl.java:3221) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.internal.SessionImpl.beforeTransactionCompletion(SessionImpl.java:2389) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.engine.jdbc.internal.JdbcCoordinatorImpl.beforeTransactionCompletion(JdbcCoordinatorImpl.java:447) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.resource.transaction.backend.jdbc.internal.JdbcResourceLocalTransactionCoordinatorImpl.beforeCompletionCallback(JdbcResourceLocalTransactionCoordinatorImpl.java:183) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.resource.transaction.backend.jdbc.internal.JdbcResourceLocalTransactionCoordinatorImpl.access$300(JdbcResourceLocalTransactionCoordinatorImpl.java:40) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.resource.transaction.backend.jdbc.internal.JdbcResourceLocalTransactionCoordinatorImpl$TransactionDriverControlImpl.commit(JdbcResourceLocalTransactionCoordinatorImpl.java:281) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    at org.hibernate.engine.transaction.internal.TransactionImpl.commit(TransactionImpl.java:101) ~[hibernate-core-5.4.9.Final.jar:5.4.9.Final]
    ... 21 common frames omitted
```

## Learn to implement custom Swagger Documentation

We have covered how to add and print default Swagger documentation to our applications. That was good stuff! But what if we don’t like the default documentation and want to add our own? We can do that! One nice side effect of the way this works is the default documentation shows up and then if we want to customize it, we can. The parts we don’t customize will get the default documentation!

We can specifically put custom Swagger documentation on the following items:

#### Models
At the table level including
* Name
* Description
At the column, field, or property level including
* Name
* Description (called value)
* Required or not
* Giving an example

#### Controller
Operation’s Level
* Description (called value)
* Response type (Class type)
* Response container type (optional, usually a List)
ApiResponse
* List of status codes
  * value
    * Status Code
    * Custom Message
    * Response (class)
Parameters
* Description (called value)
* Required or not
* Example (if a base data type or String)

Swagger can do much, much more but let’s stick with the basics for now. Remember the end result is to provide documentation to your clients on how to use your API!

Let’s add some custom Swagger documentation to an existing application.

Open the application java-sampleswagger-initial from the GitHub repository https://github.com/LambdaSchool/java-sampleswagger.git. This application is similar to the application from https://github.com/LambdaSchool/java-sampleemps.git/sampleemps_data_modeling with the addition of find employee by id endpoints and associated code. I also added the ErrorDetail and ValidationError classes to show how you can customize Swagger when you have full exception handling in place.

### Start with the defaults

First, we need to add the dependencies and configuration for the default Swagger documentation.

Add the following Swagger Dependencies to the `pom.xml` file

```xml
        <!-- Swagger Dependencies Start -->
        <!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger2 -->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>2.9.2</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui -->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <version>2.9.2</version>
        </dependency>

        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-bean-validators</artifactId>
            <version>2.9.2</version>
        </dependency>
        <!-- Swagger Dependencies End -->
```

The `springfox-bean-validator` allows Swagger to recognize some of the validation annotations and document their messages as well! Now we need to add the configuration file for Swagger. This is similar to the configuration file we added before. However, notice the addition of the annotation `@Import(BeanValidatorPluginsConfiguration.class)`. Again, this always Swagger to work with the validation annotations. Feel free to put in your own contact information! Remember in adding all of this code, you will need to make sure the proper imports are done!

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@Import(BeanValidatorPluginsConfiguration.class)
public class Swagger2Config
{
    @Bean
    public Docket api()
    {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors
                .basePackage("com.lambdaschool.sampleemps"))
            .paths(PathSelectors.regex("/.*"))
            .build()
            .apiInfo(apiEndPointsInfo());
    }

    private ApiInfo apiEndPointsInfo()
    {
        return new ApiInfoBuilder().title("Custom Swagger Documentation Example")
            .description("Custom Swagger Documentation Example")
            .contact(new Contact("John Mitchell",
                "http://www.lambdaschool.com",
                "john@lambdaschool.com"))
            .license("MIT")
            .licenseUrl("https://github.com/LambdaSchool/java-sampleswagger/blob/master/LICENSE")
            .version("1.0.0")
            .build();
    }
```

### Document the Models

Now let’s add custom Swagger documentation to the Employee Model Let’s describe the model itself. Right before the class header, add the following annotation. Note that value is the name of the model or table and description tells us what is actually being modeled.

```java
@ApiModel(value = "Employee",
    description = "Yes an actual employee record")
// class header and following code
```

For any property in any entity that needs custom documentation, you use the `@ApiModelProperty` annotation. So, for each field in the Employee model, add the following annotation adjusting the information to fit the property. This annotation goes right before the field declaration. For example, this is the annotation for the primary key. Note that here description is called value and example always takes a String value.

```java
    @ApiModelProperty(name = "employee id",
        value = "primary key for employee",
        required = true,
        example = "1")
// field declaration
```

Annotation for the employee name:

```java
    @ApiModelProperty(name = "employee name",
        value = "full name of employee",
        required = true,
        example = "Best Employee")
// field declaration
```

A Documented Employee Model

```java
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.ArrayList;
import java.util.List;

@ApiModel(value = "Employee",
        description = "Yes an actual employee record")
@Entity
@Table(name = "employees")
@JsonIgnoreProperties(value = {"hasvalueforsalary"})
public class Employee extends Auditable
{
    @ApiModelProperty(name = "employee id",
            value = "primary key for employee",
            required = true,
            example = "1")
    @Id // The primary key
    @GeneratedValue(strategy = GenerationType.AUTO) // We will let the database decide how to generate it
    private long employeeid; // long so we can have many rows

    @ApiModelProperty(name = "employee name",
            value = "full name of employee",
            required = true,
            example = "Best Employee")
    @Column(nullable = false,
            unique = true)
    private String name;

    @Transient
    public boolean hasvalueforsalary = false;

    @ApiModelProperty(name = "employee name",
            value = "salary of employee",
            required = false,
            example = "100000")
    private double salary;

    /*
     * emp is the field from EmployeeTitles
     * CascadeType.ALL says that when we add, update, delete an Employee record, have that affect emp in EmployeeTitle.
     * Notice that in EmployeeTitle there is no cascade option. This way manipulating an Employee record only affects
     * the EmployeeTitle join table but does not affect the JobTitle table.
     */
    @OneToMany(mappedBy = "emp",
        cascade = CascadeType.ALL)
    /*
     * When displaying EmployeeTitles from the Employee class, do not display the employee again.
     * However do allow for data to be added to the emp field in EmployeeTitles
     */
    @JsonIgnoreProperties(value = "emp",
        allowSetters = true)
    /*
     * We know all of this works with EmployeeTitles because that is the class of the field name that making the One To Many relationship!
     * This array contains the list of EmployeeTitles assigned to this Employee
     */
    private List<EmployeeTitles> jobnames = new ArrayList<>();

    /*
     * This starts the One To Many relation of employee to emails
     */
    @OneToMany(mappedBy = "employee",
        cascade = CascadeType.ALL,
        // when adding, reading, updating, and delete, the operations should affect the emails table as well)
        orphanRemoval = true)
    // if we find a email that has a reference to an employee that does not exist, delete that email record
    @JsonIgnoreProperties(value = "employee",
        allowSetters = true)
    private List<Email> emails = new ArrayList<>();

    public Employee()
    {
        // the default constructor is required by the JPA
    }

    public Employee(
        String name,
        double salary,
        List<EmployeeTitles> jobnames)
    {
        this.name = name;
        this.salary = salary;

        /*
         * Force the list of roles to be associated with this new employee object!
         */
        for (EmployeeTitles et : jobnames)
        {
            et.setEmp(this);
        }
        this.jobnames = jobnames;
    }

    public long getEmployeeid()
    {
        return employeeid;
    }

    public void setEmployeeid(long employeeid)
    {
        this.employeeid = employeeid;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public double getSalary()
    {
        return salary;
    }

    public void setSalary(double salary)
    {
        hasvalueforsalary = true;
        this.salary = salary;
    }

    public List<Email> getEmails()
    {
        return emails;
    }

    public void setEmails(List<Email> emails)
    {
        this.emails = emails;
    }

    /*
     * We need a getter for the new One To Many relations
     */
    public List<EmployeeTitles> getJobnames()
    {
        return jobnames;
    }

    /*
     * We need a setter for the new One To Many relations
     */
    public void setJobnames(List<EmployeeTitles> jobnames)
    {
        this.jobnames = jobnames;
    }

    /*
     * Due to the new One To Many relation, we need a new way to add a Job Title to the employee
     */
    public void addJobTitle(
        JobTitle jobTitle,
        String manager)
    {
        jobnames.add(new EmployeeTitles(this,
            jobTitle,
            manager));
    }
}
```

### Document the controllers

Now let’s add custom Swagger documentation to the EmployeeControl, first adding annotations to the list all employees endpoint. All we need for the list all employees endpoint is the `@ApiOperation` with a value, description, a response class, and a response container class. So add the following annotation before the listAllEmployees() method

```java
    @ApiOperation(value = "returns all Employees",
        response = Employee.class,
        responseContainer = "List")
    // method header
```

Now let’s look at one slightly more involved - return a single employee based off an employee id. Here we are adding

* `ApiOperation` to explain what is happening and any response types.
* `@ApiResponses` to document how you are responding to exceptions. This only makes sense if you have full exception handling in place in your application. Otherwise I would leave this annotation out and just use the Swagger defaults for ApiResponses.
* `@ApiParam` is needed before each parameter in the method header! Here we just have one Parameter, the employee id we are seeking. Even if the parameter is coming in through the request body, we still annotation the parameter.

Add the following annotations to your employee controller for the method getEmployeeById.

```java
    @ApiOperation(value = "Retrieve an employee based off of employee id",
        response = Employee.class)
    @ApiResponses(value = {@ApiResponse(code = 200,
        message = "Employee Found",
        response = Employee.class), @ApiResponse(code = 404,
        message = "Employee Not Found",
        response = ErrorDetail.class)})
    // method header
    //...
        @ApiParam(value = "Employee id",
            required = true,
            example = "4")
    // @PathVariable and following
```

And let’s do one more. Let’s document the PUT employee endpoint. What is different about this endpoint is that nothing is returned in the response body, so we say the response is `Void.class` Add the following annotation to your code to document the PUT endpoint.

```java
    @ApiOperation(value = "updates an employee given in the request body",
        response = Void.class)
    @ApiResponses(value = {@ApiResponse(code = 200,
        message = "Employee Found",
        response = Void.class), @ApiResponse(code = 404,
        message = "Employeer Not Found",
        response = ErrorDetail.class)})
    // method headers
            @ApiParam(value = "a full employee object",
            required = true)
    //...
        @ApiParam(value = "employeeid",
            required = true,
            example = "4")
    //...
```

The Employee Controller with Annotations in Place

```java
import com.lambdaschool.sampleemps.models.Employee;
import com.lambdaschool.sampleemps.models.ErrorDetail;
import com.lambdaschool.sampleemps.services.EmployeeService;
import com.lambdaschool.sampleemps.views.EmpNameCountJobs;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/employees") // optional
public class EmployeeController
{
    @Autowired
    private EmployeeService employeeService;

    @ApiOperation(value = "returns all Employees",
            response = Employee.class,
            responseContainer = "List")
    @GetMapping(value = "/employees")
    public ResponseEntity<?> listAllEmployees()
    {
        List<Employee> myEmployees = employeeService.findAllEmployees();
        return new ResponseEntity<>(myEmployees,
            HttpStatus.OK);
    }

    @ApiOperation(value = "Retrieve an employee based off of employee id",
            response = Employee.class)
    @ApiResponses(value = {@ApiResponse(code = 200,
            message = "Employee Found",
            response = Employee.class), @ApiResponse(code = 404,
            message = "Employee Not Found",
            response = ErrorDetail.class)})
    @GetMapping(value = "/employee/{employeeid}")
    public ResponseEntity<?> getEmployeeById(
            @ApiParam(value = "Employee id",
                    required = true,
                    example = "4")
            @PathVariable
                    long employeeid)
    {
        Employee e = employeeService.findEmployeeById(employeeid);
        return new ResponseEntity<>(e, HttpStatus.OK);
    }

    @GetMapping(value = "/employeename/{subname}")
    public ResponseEntity<?> listEmployeesWithName(
        @PathVariable
            String subname)
    {
        List<Employee> myEmployees = employeeService.findEmployeeNameContaining(subname);
        return new ResponseEntity<>(myEmployees,
            HttpStatus.OK);
    }

    @GetMapping(value = "/employeeemail/{subemail}")
    public ResponseEntity<?> listEmployeesWithEmail(
        @PathVariable
            String subemail)
    {
        List<Employee> myEmployees = employeeService.findEmployeeEmailContaining(subemail);
        return new ResponseEntity<>(myEmployees,
            HttpStatus.OK);
    }

    @PostMapping(value = "/employee",
        consumes = {"application/json"})
    public ResponseEntity<?> addNewEmployee(
        @Valid
        @RequestBody
            Employee newEmployee)
    {
        // ids are not recognized by the Post method
        newEmployee.setEmployeeid(0);
        newEmployee = employeeService.save(newEmployee);

        // set the location header for the newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newEmployeeURI = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{employeeid}")
            .buildAndExpand(newEmployee.getEmployeeid())
            .toUri();
        responseHeaders.setLocation(newEmployeeURI);

        return new ResponseEntity<>(null,
            responseHeaders,
            HttpStatus.CREATED);
    }

    @ApiOperation(value = "updates an employee given in the request body",
            response = Void.class)
    @ApiResponses(value = {@ApiResponse(code = 200,
            message = "Employee Found",
            response = Void.class), @ApiResponse(code = 404,
            message = "Employeer Not Found",
            response = ErrorDetail.class)})
    @PutMapping(value = "/employee/{employeeid}",
        consumes = {"application/json"})
    public ResponseEntity<?> updateFullEmployee(
        @ApiParam(value = "a full employee object",
                required = true)
        @Valid
        @RequestBody
            Employee updateEmployee,
        @ApiParam(value = "employeeid",
                required = true,
                example = "4")
        @PathVariable
            long employeeid)
    {
        updateEmployee.setEmployeeid(employeeid);
        employeeService.save(updateEmployee);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping(value = "/employee/{employeeid}",
        consumes = {"application/json"})
    public ResponseEntity<?> updateEmployee(
        @RequestBody
            Employee updateEmployee,
        @PathVariable
            long employeeid)
    {
        employeeService.update(updateEmployee,
            employeeid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/employee/{employeeid}")
    public ResponseEntity<?> deleteEmployeeById(
        @PathVariable
            long employeeid)
    {
        employeeService.delete(employeeid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/job/counts")
    public ResponseEntity<?> getEmpJobCounts()
    {
        List<EmpNameCountJobs> myEmployees = employeeService.getEmpNameCountJobs();
        return new ResponseEntity<>(myEmployees,
            HttpStatus.OK);
    }

    @DeleteMapping(value = "/employee/{employeeid}/jobtitle/{jobtitleid}")
    public ResponseEntity<?> deleteEmployeeJobTitlesByid(
        @PathVariable
            long employeeid,
        @PathVariable
            long jobtitleid)
    {
        employeeService.deleteEmpJobTitle(employeeid,
        jobtitleid);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/employee/{employeeid}/jobtitle/{jobtitleid}/manager/{manager}")
    public ResponseEntity<?> addEmployeeJobTitlesByid(
        @PathVariable
            long employeeid,
        @PathVariable
            long jobtitleid,
        @PathVariable
            String manager)
    {
        employeeService.addEmpJobTitle(employeeid,
            jobtitleid, manager);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
```

### Examine our work

Run the application and surf to the site http://localhost:2019/swagger-ui.html.

* Expand the information for the Employee Controller and notice your custom documentation is now being used!
* Expand the information for the Employee Model and notice that custom documentation is now being used!

Your task is to add custom Swagger documentation to the `JobTitle` Model and to the rest of the end points in the `EmployeeController`

## Learn to gather and use data from other APIs

Often we need to get data from other backend APIs systems. These are either provided by other companies, data scientist people within our own company, or some other group. We become the client. We are reliant on the other system on how to retrieve the data and how the retrieved data is organized. Let’s take a look at a few examples.

We are going to retrieve data from three different APIs that return the data is three common, but very different ways.

### Straight JSON

The easiest to work with will be Straight JSON as from the API http://numbersapi.com/random/year?json. This API returns a random math fact based on a random year. Surfing to that site returns

```javascript
{
    "text": "287 is the year that Emperor Diocletian and Maximian become Roman Consuls.",
    "number": 287,
    "found": true,
    "type": "year"
}
```

### Extra Fields wrapped in a class

Sometimes our data comes back wrapped in a class name and contains fields we do not need. For example, the API http://api.open-notify.org/iss-now.json does this. This API returns the current location of the International Space Station.

```javascript
{
    "message": "success",
    "iss_position": {
        "latitude": "-46.3184",
        "longitude": "-65.6439"
    },
    "timestamp": 1590079067
}
```

### Wrapped in a class requiring a parameter

Sometimes to get the data we want we have to send a parameter along with our endpoint. This API will return the Klingon translation of the given English phrase. https://api.funtranslations.com/translate/klingon.json?text=”The enemy of my enemy is the enemy I kill last”

```javascript
{
    "success": {
        "total": 1
    },
    "contents": {
        "translated": "\"The jagh of my jagh is the jagh jih hoh hochdich\"",
        "text": "\"The enemy of my enemy is the enemy I kill last\"",
        "translation": "klingon"
    }
}
```

For all the data we retrieve we need to create a model that can store the data. This data may or not need to be saved to our database. This is usually accomplished through a separate model class for the data along with a collection to store a list of the data. Let’s see how this works in practice! As we are creating POJOs to hold our JSON objects, do note how the names of the fields must match exactly between the two entities.

### Straight JSON

We want to report a random fact about a year to the console on application start up. Let’s create a model to hold the data we will get back from the API. Under the `models` subpackage, create a class called `YearFact`. This will NOT be saved in our database so we will NOT use the `@Entity` annotation. We need a field to hold each one of the pieces of data we want to save. We also need an annotation to say to ignore all other pieces of data. We will be using `@JsonIgnoreProperties(ignoreUnknown = true)`.

* The API endpoint we are accessing is http://numbersapi.com/random/year?json
* Looking at the JSON that is returned by this endpoint we only want the data `text` and `number`. See JSON object from above.

So enter the following code for the class `YearFact`. Remember in adding all of this code, you will need to make sure the proper imports are done! Do note how closely this matches the layout of the JSON object!

```java
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

// needed to ignore any fields coming across that we do not want in our final class.
@JsonIgnoreProperties(ignoreUnknown = true)
public class YearFact
{
    private String text;
    private int number;

    public String getText()
    {
        return text;
    }

    public void setText(String text)
    {
        this.text = text;
    }

    public int getNumber()
    {
        return number;
    }

    public void setNumber(int number)
    {
        this.number = number;
    }

    @Override
    public String toString()
    {
        return "YearFact{" +
                "text='" + text + '\'' +
                ", number=" + number +
                '}';
    }
}
```

We now need to go get the data and then display it in the console. Add the following code to the `main` method in the `SampleempsApplication` class. In this code we introduce

* The `RestTemplate` - creates the object that is needed to do a client side Rest API call.
* `MappingJackson2HttpMessageConverter` - a way to configure our rest request.
* Doing a request now instead of responding to one.

```java
        /*
         * Creates the object that is needed to do a client side Rest API call.
         * We are the client getting data from a remote API.
         */
        RestTemplate restTemplate = new RestTemplate();

        // we need to tell our RestTemplate what format to expect
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        // a couple of common formats
        // converter.setSupportedMediaTypes(Collections.singletonList(MediaType.TEXT_HTML));
        // converter.setSupportedMediaTypes(Collections.singletonList(MediaType.APPLICATION_JSON));
        // or we can accept all formats! Easiest but least secure
        converter.setSupportedMediaTypes(Collections.singletonList(MediaType.ALL));
        restTemplate.getMessageConverters().add(converter);

        // create the url to access the API
        String requestURL = "http://numbersapi.com/random/year?json";
        // create the responseType expected. Notice the YearFact is the data type we are expecting back from the API!
        ParameterizedTypeReference<YearFact> responseType = new ParameterizedTypeReference<>()
        {
        };
        // create the response entity. do the get and get back information
        ResponseEntity<YearFact> responseEntity = restTemplate.exchange(requestURL,
                HttpMethod.GET,
                null,
                responseType);
        // now that we have our data, let's print it to the console!
        YearFact ourYearFact = responseEntity.getBody();
        System.out.println(ourYearFact);
```

So we end up with the following `SampleempsApplication` class.

```java
import com.lambdaschool.sampleemps.models.YearFact;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@EnableJpaAuditing
@SpringBootApplication
public class SampleempsApplication
{

    public static void main(String[] args)
    {
        /*
         * Creates the object that is needed to do a client side Rest API call.
         * We are the client getting data from a remote API.
         */
        RestTemplate restTemplate = new RestTemplate();

        // we need to tell our RestTemplate what format to expect
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        // a couple of common formats
        // converter.setSupportedMediaTypes(Collections.singletonList(MediaType.TEXT_HTML));
        // converter.setSupportedMediaTypes(Collections.singletonList(MediaType.APPLICATION_JSON));
        // or we can accept all formats! Easiest but least secure
        converter.setSupportedMediaTypes(Collections.singletonList(MediaType.ALL));
        restTemplate.getMessageConverters().add(converter);

        // create the url to access the API
        String requestURL = "http://numbersapi.com/random/year?json";
        // create the responseType expected. Notice the YearFact is the data type we are expecting back from the API!
        ParameterizedTypeReference<YearFact> responseType = new ParameterizedTypeReference<>()
        {
        };
        // create the response entity. do the get and get back information
        ResponseEntity<YearFact> responseEntity = restTemplate.exchange(requestURL,
                HttpMethod.GET,
                null,
                responseType);
        // now that we have our data, let's print it to the console!
        YearFact ourYearFact = responseEntity.getBody();
        System.out.println(ourYearFact);

        SpringApplication.run(SampleempsApplication.class,
            args);
    }
}
```

Run the application and notice something similar in the console!

```
14:38:16.213 [main] DEBUG org.springframework.web.client.RestTemplate - HTTP GET http://numbersapi.com/random/year?json
14:38:16.242 [main] DEBUG org.springframework.web.client.RestTemplate - Accept=[application/json, application/*+json, */*]
14:38:23.788 [main] DEBUG org.springframework.web.client.RestTemplate - Response 200 OK
14:38:23.791 [main] DEBUG org.springframework.web.client.RestTemplate - Reading to [com.lambdaschool.sampleemps.models.YearFact]
YearFact{text='1889 is the year that International Workers Congresses of Paris.', number=1889}
14:38:23.899 [restartedMain] DEBUG org.springframework.web.client.RestTemplate - HTTP GET http://numbersapi.com/random/year?json
14:38:23.901 [restartedMain] DEBUG org.springframework.web.client.RestTemplate - Accept=[application/json, application/*+json, */*]
14:38:23.981 [restartedMain] DEBUG org.springframework.web.client.RestTemplate - Response 200 OK
14:38:23.982 [restartedMain] DEBUG org.springframework.web.client.RestTemplate - Reading to [com.lambdaschool.sampleemps.models.YearFact]
YearFact{text='1366 is the year that Muhammed V builds the Granada Hospital in Granada (in present-day Spain).', number=1366}
```

### Extra Fields wrapped in a class

We want an endpoint that will return the current position of the international space station.

Create a model to hold the ISS Position data. We only want the fields latitude and longitude which are part of the iss_position class embedded in the JSON Object. Let’s create a model to hold the data that is retrieved from the API. This model will include a field that is of some class type. Create a model called `IssPositionReturnData` in the subpackage `models`. Add the following code.

* Do note how closely this matches the layout of the JSON object!
* Do note that we do not need the `@JsonIgnoreProperties(ignoreUnknown = true)` as we are handling all incoming pieces of data. We not returning all that data to the client but we have a place in our application to store all data retrieved from the API.
* Note that the field of the embedded class type has to match the field name from the JSON Object, just like all the other fields. Nothing special about it being a class!

```java
public class IssPositionReturnData
{
    private String message;
    private IssPosition iss_position;
    private long timestamp;

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }

    public IssPosition getIss_position()
    {
        return iss_position;
    }

    public void setIss_position(IssPosition iss_position)
    {
        this.iss_position = iss_position;
    }

    public long getTimestamp()
    {
        return timestamp;
    }

    public void setTimestamp(long timestamp)
    {
        this.timestamp = timestamp;
    }
}
```

We now need to create that embedded class type. Create a model called `IssPosition` in the subpackage `models`. Add the following code.

```java
public class IssPosition
{
    private String latitude;
    private String longitude;

    public String getLatitude()
    {
        return latitude;
    }

    public void setLatitude(String latitude)
    {
        this.latitude = latitude;
    }

    public String getLongitude()
    {
        return longitude;
    }

    public void setLongitude(String longitude)
    {
        this.longitude = longitude;
    }
}
```

Now let’s go retrieve the data. Create a new class under the subpackage `controllers` called `OtherApis`. Add the following code.

```java
import com.lambdaschool.sampleemps.models.IssPosition;
import com.lambdaschool.sampleemps.models.IssPositionReturnData;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@RestController
@RequestMapping("/otherapis") // optional
public class OtherApis
{
    /*
     * Creates the object that is needed to do a client side Rest API call.
     * We are the client getting data from a remote API.
     * We can share this template among endpoints
     */
    private RestTemplate restTemplate = new RestTemplate();

    @GetMapping(value = "/isspositions")
    public ResponseEntity<?> listIssPositions()
    {
        // we need to tell our RestTemplate what format to expect
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        // a couple of common formats
        // converter.setSupportedMediaTypes(Collections.singletonList(MediaType.TEXT_HTML));
        // converter.setSupportedMediaTypes(Collections.singletonList(MediaType.APPLICATION_JSON));
        // or we can accept all formats! Easiest but least secure
        converter.setSupportedMediaTypes(Collections.singletonList(MediaType.ALL));
        restTemplate.getMessageConverters().add(converter);

        // create the url to access the API
        String requestURL = "http://api.open-notify.org/iss-now.json";
        // create the responseType expected. Notice the IssPositionReturnData is the data type we are expecting back from the API!
        ParameterizedTypeReference<IssPositionReturnData> responseType = new ParameterizedTypeReference<>()
        {
        };

        // create the response entity. do the get and get back information
        ResponseEntity<IssPositionReturnData> responseEntity = restTemplate.exchange(requestURL,
                HttpMethod.GET,
                null,
                responseType);
        // we want to return the Iss_position data. From the data that gets returned in the body,
        // get the Iss_position data only and return it.
        // putting the data into its own object first, prevents the data from being reported to client inside of
        // an embedded. So the response will look more like our clients are use to!
        IssPosition ourIssPosition = responseEntity.getBody().getIss_position();
        return new ResponseEntity<>(ourIssPosition,
                HttpStatus.OK);
    }
}
```

Run the application and surf to the endpoint http://localhost:2019/otherapis/isspositions. You get back data similar to the following

```javascript
{
    "latitude": "38.1104",
    "longitude": "-49.8389"
}
```

### Wrapped in a class requiring a parameter

We want an endpoint that will return the Klingon translation of a phrase coming in through a path variable. We need to create a class that contains a field that is of type `contents` class. So, we also need to create the `contents` class. In the `models` subpackage, create a class called Translation. Add to that the class the following code. Note that the field of the embedded class type has to match the field name from the JSON Object, just like all the other fields. Nothing special about it being a class!

```java
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Translation
{
    private TranslationContents contents;

    public TranslationContents getContents()
    {
        return contents;
    }

    public void setContents(TranslationContents contents)
    {
        this.contents = contents;
    }
}
```

Now we need to create the embedded class type contents. In the `models` subpackage, create a class called `TranslationContents` and add the following code.

```java
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TranslationContents
{
    private String translated;

    public String getTranslated()
    {
        return translated;
    }

    public void setTranslated(String translated)
    {
        this.translated = translated;
    }
}
```

We will now create the endpoint to access this information. Handling of the path variable is just like we handle all other path variables. Add the following code to the bottom of the controller class `OtherApis`.

```java
    @GetMapping(value = "/klingon/{englishText}")
    public ResponseEntity<?> getTranslation(
            @PathVariable
                    String englishText)
    {
        // we need to tell our RestTemplate what format to expect
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        // a couple of common formats
        // converter.setSupportedMediaTypes(Collections.singletonList(MediaType.TEXT_HTML));
        // converter.setSupportedMediaTypes(Collections.singletonList(MediaType.APPLICATION_JSON));
        // or we can accept all formats! Easiest but least secure
        converter.setSupportedMediaTypes(Collections.singletonList(MediaType.ALL));
        restTemplate.getMessageConverters()
                .add(converter);

        // create the url to access the API including adding the path variable
        String requestURL = "https://api.funtranslations.com/translate/klingon.json?text=" + englishText;
        // create the responseType expected. Notice the Translation is the data type we are expecting back from the API!
        ParameterizedTypeReference<Translation> responseType = new ParameterizedTypeReference<>()
        {
        };

        // create the response entity. do the get and get back information
        ResponseEntity<Translation> responseEntity = restTemplate.exchange(requestURL,
                HttpMethod.GET,
                null,
                responseType);
        // we want to return the contents of the translation data. From the data that gets returned in the body,
        // get the contents data only and return it.
        // putting the data into its own object first, prevents the data from being reported to client inside of
        // an embedded. So the response will look more like our clients are use to!
        TranslationContents ourTranslation = responseEntity.getBody()
                .getContents();
        return new ResponseEntity<>(ourTranslation,
                HttpStatus.OK);
    }
```

Surf to the endpoint http://localhost:2019/otherapis/klingon/”Success”” and we get something similar to the following

```javascript
{
    "translated": "\"qapla'\""
}
```

Now surf to this endpoint http://localhost:2019/otherapis/klingon/”I want to be a backend developer” and we get something similar to the following

```javascript
{
    "translated": "\"jih neh to qu' a backend developer\""
}
```
