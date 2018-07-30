package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A EducationReport.
 */
@Document(collection = "education_report")
public class EducationReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("degree_verified")
    private String degreeVerified;

    @Field("institution_verified")
    private String institutionVerified;

    @Field("attendance_start_date_verified")
    private String attendanceStartDateVerified;

    @Field("attendance_end_date")
    private String attendanceEndDate;

    @Field("attendance_end_date_verified")
    private String attendanceEndDateVerified;

    @Field("degree_earned")
    private String degreeEarned;

    @Field("major_verified")
    private String majorVerified;

    @Field("graduation_date_verified")
    private String graduationDateVerified;

    @Field("education_person_contact_name")
    private String educationPersonContactName;

    @Field("education_designation_contact")
    private String educationDesignationContact;

    @Field("education_verified_date")
    private String educationVerifiedDate;

    @Field("education_remarks")
    private String educationRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDegreeVerified() {
        return degreeVerified;
    }

    public EducationReport degreeVerified(String degreeVerified) {
        this.degreeVerified = degreeVerified;
        return this;
    }

    public void setDegreeVerified(String degreeVerified) {
        this.degreeVerified = degreeVerified;
    }

    public String getInstitutionVerified() {
        return institutionVerified;
    }

    public EducationReport institutionVerified(String institutionVerified) {
        this.institutionVerified = institutionVerified;
        return this;
    }

    public void setInstitutionVerified(String institutionVerified) {
        this.institutionVerified = institutionVerified;
    }

    public String getAttendanceStartDateVerified() {
        return attendanceStartDateVerified;
    }

    public EducationReport attendanceStartDateVerified(String attendanceStartDateVerified) {
        this.attendanceStartDateVerified = attendanceStartDateVerified;
        return this;
    }

    public void setAttendanceStartDateVerified(String attendanceStartDateVerified) {
        this.attendanceStartDateVerified = attendanceStartDateVerified;
    }

    public String getAttendanceEndDate() {
        return attendanceEndDate;
    }

    public EducationReport attendanceEndDate(String attendanceEndDate) {
        this.attendanceEndDate = attendanceEndDate;
        return this;
    }

    public void setAttendanceEndDate(String attendanceEndDate) {
        this.attendanceEndDate = attendanceEndDate;
    }

    public String getAttendanceEndDateVerified() {
        return attendanceEndDateVerified;
    }

    public EducationReport attendanceEndDateVerified(String attendanceEndDateVerified) {
        this.attendanceEndDateVerified = attendanceEndDateVerified;
        return this;
    }

    public void setAttendanceEndDateVerified(String attendanceEndDateVerified) {
        this.attendanceEndDateVerified = attendanceEndDateVerified;
    }

    public String getDegreeEarned() {
        return degreeEarned;
    }

    public EducationReport degreeEarned(String degreeEarned) {
        this.degreeEarned = degreeEarned;
        return this;
    }

    public void setDegreeEarned(String degreeEarned) {
        this.degreeEarned = degreeEarned;
    }

    public String getMajorVerified() {
        return majorVerified;
    }

    public EducationReport majorVerified(String majorVerified) {
        this.majorVerified = majorVerified;
        return this;
    }

    public void setMajorVerified(String majorVerified) {
        this.majorVerified = majorVerified;
    }

    public String getGraduationDateVerified() {
        return graduationDateVerified;
    }

    public EducationReport graduationDateVerified(String graduationDateVerified) {
        this.graduationDateVerified = graduationDateVerified;
        return this;
    }

    public void setGraduationDateVerified(String graduationDateVerified) {
        this.graduationDateVerified = graduationDateVerified;
    }

    public String getEducationPersonContactName() {
        return educationPersonContactName;
    }

    public EducationReport educationPersonContactName(String educationPersonContactName) {
        this.educationPersonContactName = educationPersonContactName;
        return this;
    }

    public void setEducationPersonContactName(String educationPersonContactName) {
        this.educationPersonContactName = educationPersonContactName;
    }

    public String getEducationDesignationContact() {
        return educationDesignationContact;
    }

    public EducationReport educationDesignationContact(String educationDesignationContact) {
        this.educationDesignationContact = educationDesignationContact;
        return this;
    }

    public void setEducationDesignationContact(String educationDesignationContact) {
        this.educationDesignationContact = educationDesignationContact;
    }

    public String getEducationVerifiedDate() {
        return educationVerifiedDate;
    }

    public EducationReport educationVerifiedDate(String educationVerifiedDate) {
        this.educationVerifiedDate = educationVerifiedDate;
        return this;
    }

    public void setEducationVerifiedDate(String educationVerifiedDate) {
        this.educationVerifiedDate = educationVerifiedDate;
    }

    public String getEducationRemarks() {
        return educationRemarks;
    }

    public EducationReport educationRemarks(String educationRemarks) {
        this.educationRemarks = educationRemarks;
        return this;
    }

    public void setEducationRemarks(String educationRemarks) {
        this.educationRemarks = educationRemarks;
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
        EducationReport educationReport = (EducationReport) o;
        if (educationReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), educationReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EducationReport{" +
            "id=" + getId() +
            ", degreeVerified='" + getDegreeVerified() + "'" +
            ", institutionVerified='" + getInstitutionVerified() + "'" +
            ", attendanceStartDateVerified='" + getAttendanceStartDateVerified() + "'" +
            ", attendanceEndDate='" + getAttendanceEndDate() + "'" +
            ", attendanceEndDateVerified='" + getAttendanceEndDateVerified() + "'" +
            ", degreeEarned='" + getDegreeEarned() + "'" +
            ", majorVerified='" + getMajorVerified() + "'" +
            ", graduationDateVerified='" + getGraduationDateVerified() + "'" +
            ", educationPersonContactName='" + getEducationPersonContactName() + "'" +
            ", educationDesignationContact='" + getEducationDesignationContact() + "'" +
            ", educationVerifiedDate='" + getEducationVerifiedDate() + "'" +
            ", educationRemarks='" + getEducationRemarks() + "'" +
            "}";
    }
}
