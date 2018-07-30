package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A EmploymentReport.
 */
@Document(collection = "employment_report")
public class EmploymentReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("employer_verified")
    private String employerVerified;

    @Field("employment_start_date_verified")
    private String employmentStartDateVerified;

    @Field("employment_end_date_verified")
    private String employmentEndDateVerified;

    @Field("title_verified")
    private String titleVerified;

    @Field("slary_verified")
    private String slaryVerified;

    @Field("reason_for_termination")
    private String reasonForTermination;

    @Field("employment_person_contact_name")
    private String employmentPersonContactName;

    @Field("employment_designation_contact")
    private String employmentDesignationContact;

    @Field("employment_verified_date")
    private String employmentVerifiedDate;

    @Field("employment_rehire_eligibility")
    private String employmentRehireEligibility;

    @Field("employment_rehire_explanation")
    private String employmentRehireExplanation;

    @Field("employment_remarks")
    private String employmentRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployerVerified() {
        return employerVerified;
    }

    public EmploymentReport employerVerified(String employerVerified) {
        this.employerVerified = employerVerified;
        return this;
    }

    public void setEmployerVerified(String employerVerified) {
        this.employerVerified = employerVerified;
    }

    public String getEmploymentStartDateVerified() {
        return employmentStartDateVerified;
    }

    public EmploymentReport employmentStartDateVerified(String employmentStartDateVerified) {
        this.employmentStartDateVerified = employmentStartDateVerified;
        return this;
    }

    public void setEmploymentStartDateVerified(String employmentStartDateVerified) {
        this.employmentStartDateVerified = employmentStartDateVerified;
    }

    public String getEmploymentEndDateVerified() {
        return employmentEndDateVerified;
    }

    public EmploymentReport employmentEndDateVerified(String employmentEndDateVerified) {
        this.employmentEndDateVerified = employmentEndDateVerified;
        return this;
    }

    public void setEmploymentEndDateVerified(String employmentEndDateVerified) {
        this.employmentEndDateVerified = employmentEndDateVerified;
    }

    public String getTitleVerified() {
        return titleVerified;
    }

    public EmploymentReport titleVerified(String titleVerified) {
        this.titleVerified = titleVerified;
        return this;
    }

    public void setTitleVerified(String titleVerified) {
        this.titleVerified = titleVerified;
    }

    public String getSlaryVerified() {
        return slaryVerified;
    }

    public EmploymentReport slaryVerified(String slaryVerified) {
        this.slaryVerified = slaryVerified;
        return this;
    }

    public void setSlaryVerified(String slaryVerified) {
        this.slaryVerified = slaryVerified;
    }

    public String getReasonForTermination() {
        return reasonForTermination;
    }

    public EmploymentReport reasonForTermination(String reasonForTermination) {
        this.reasonForTermination = reasonForTermination;
        return this;
    }

    public void setReasonForTermination(String reasonForTermination) {
        this.reasonForTermination = reasonForTermination;
    }

    public String getEmploymentPersonContactName() {
        return employmentPersonContactName;
    }

    public EmploymentReport employmentPersonContactName(String employmentPersonContactName) {
        this.employmentPersonContactName = employmentPersonContactName;
        return this;
    }

    public void setEmploymentPersonContactName(String employmentPersonContactName) {
        this.employmentPersonContactName = employmentPersonContactName;
    }

    public String getEmploymentDesignationContact() {
        return employmentDesignationContact;
    }

    public EmploymentReport employmentDesignationContact(String employmentDesignationContact) {
        this.employmentDesignationContact = employmentDesignationContact;
        return this;
    }

    public void setEmploymentDesignationContact(String employmentDesignationContact) {
        this.employmentDesignationContact = employmentDesignationContact;
    }

    public String getEmploymentVerifiedDate() {
        return employmentVerifiedDate;
    }

    public EmploymentReport employmentVerifiedDate(String employmentVerifiedDate) {
        this.employmentVerifiedDate = employmentVerifiedDate;
        return this;
    }

    public void setEmploymentVerifiedDate(String employmentVerifiedDate) {
        this.employmentVerifiedDate = employmentVerifiedDate;
    }

    public String getEmploymentRehireEligibility() {
        return employmentRehireEligibility;
    }

    public EmploymentReport employmentRehireEligibility(String employmentRehireEligibility) {
        this.employmentRehireEligibility = employmentRehireEligibility;
        return this;
    }

    public void setEmploymentRehireEligibility(String employmentRehireEligibility) {
        this.employmentRehireEligibility = employmentRehireEligibility;
    }

    public String getEmploymentRehireExplanation() {
        return employmentRehireExplanation;
    }

    public EmploymentReport employmentRehireExplanation(String employmentRehireExplanation) {
        this.employmentRehireExplanation = employmentRehireExplanation;
        return this;
    }

    public void setEmploymentRehireExplanation(String employmentRehireExplanation) {
        this.employmentRehireExplanation = employmentRehireExplanation;
    }

    public String getEmploymentRemarks() {
        return employmentRemarks;
    }

    public EmploymentReport employmentRemarks(String employmentRemarks) {
        this.employmentRemarks = employmentRemarks;
        return this;
    }

    public void setEmploymentRemarks(String employmentRemarks) {
        this.employmentRemarks = employmentRemarks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EmploymentReport employmentReport = (EmploymentReport) o;
        if (employmentReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employmentReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmploymentReport{" +
            "id=" + getId() +
            ", employerVerified='" + getEmployerVerified() + "'" +
            ", employmentStartDateVerified='" + getEmploymentStartDateVerified() + "'" +
            ", employmentEndDateVerified='" + getEmploymentEndDateVerified() + "'" +
            ", titleVerified='" + getTitleVerified() + "'" +
            ", slaryVerified='" + getSlaryVerified() + "'" +
            ", reasonForTermination='" + getReasonForTermination() + "'" +
            ", employmentPersonContactName='" + getEmploymentPersonContactName() + "'" +
            ", employmentDesignationContact='" + getEmploymentDesignationContact() + "'" +
            ", employmentVerifiedDate='" + getEmploymentVerifiedDate() + "'" +
            ", employmentRehireEligibility='" + getEmploymentRehireEligibility() + "'" +
            ", employmentRehireExplanation='" + getEmploymentRehireExplanation() + "'" +
            ", employmentRemarks='" + getEmploymentRemarks() + "'" +
            "}";
    }
}
