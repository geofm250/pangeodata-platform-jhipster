package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OrderEducationForm.
 */
@Document(collection = "order_education_form")
public class OrderEducationForm implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("type_diploma")
    private String typeDiploma;

    @Field("name_of_institution")
    private String nameOfInstitution;

    @Field("institution_local_name")
    private String institutionLocalName;

    @Field("subject")
    private String subject;

    @Field("performance")
    private String performance;

    @Field("type_of_institution")
    private String typeOfInstitution;

    @Field("source_website")
    private String sourceWebsite;

    @Field("source_name")
    private String sourceName;

    @Field("source_phone")
    private String sourcePhone;

    @Field("source_email")
    private String sourceEmail;

    @Field("present")
    private String present;

    @Field("attendance_start_date")
    private String attendanceStartDate;

    @Field("attendance_end_date")
    private String attendanceEndDate;

    @Field("diploma_award_date")
    private String diplomaAwardDate;

    @Field("student_registration_no")
    private String studentRegistrationNo;

    @Field("town")
    private String town;

    @Field("state")
    private String state;

    @Field("country")
    private String country;

    @Field("postal_code")
    private String postalCode;

    @Field("notes")
    private String notes;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTypeDiploma() {
        return typeDiploma;
    }

    public OrderEducationForm typeDiploma(String typeDiploma) {
        this.typeDiploma = typeDiploma;
        return this;
    }

    public void setTypeDiploma(String typeDiploma) {
        this.typeDiploma = typeDiploma;
    }

    public String getNameOfInstitution() {
        return nameOfInstitution;
    }

    public OrderEducationForm nameOfInstitution(String nameOfInstitution) {
        this.nameOfInstitution = nameOfInstitution;
        return this;
    }

    public void setNameOfInstitution(String nameOfInstitution) {
        this.nameOfInstitution = nameOfInstitution;
    }

    public String getInstitutionLocalName() {
        return institutionLocalName;
    }

    public OrderEducationForm institutionLocalName(String institutionLocalName) {
        this.institutionLocalName = institutionLocalName;
        return this;
    }

    public void setInstitutionLocalName(String institutionLocalName) {
        this.institutionLocalName = institutionLocalName;
    }

    public String getSubject() {
        return subject;
    }

    public OrderEducationForm subject(String subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getPerformance() {
        return performance;
    }

    public OrderEducationForm performance(String performance) {
        this.performance = performance;
        return this;
    }

    public void setPerformance(String performance) {
        this.performance = performance;
    }

    public String getTypeOfInstitution() {
        return typeOfInstitution;
    }

    public OrderEducationForm typeOfInstitution(String typeOfInstitution) {
        this.typeOfInstitution = typeOfInstitution;
        return this;
    }

    public void setTypeOfInstitution(String typeOfInstitution) {
        this.typeOfInstitution = typeOfInstitution;
    }

    public String getSourceWebsite() {
        return sourceWebsite;
    }

    public OrderEducationForm sourceWebsite(String sourceWebsite) {
        this.sourceWebsite = sourceWebsite;
        return this;
    }

    public void setSourceWebsite(String sourceWebsite) {
        this.sourceWebsite = sourceWebsite;
    }

    public String getSourceName() {
        return sourceName;
    }

    public OrderEducationForm sourceName(String sourceName) {
        this.sourceName = sourceName;
        return this;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getSourcePhone() {
        return sourcePhone;
    }

    public OrderEducationForm sourcePhone(String sourcePhone) {
        this.sourcePhone = sourcePhone;
        return this;
    }

    public void setSourcePhone(String sourcePhone) {
        this.sourcePhone = sourcePhone;
    }

    public String getSourceEmail() {
        return sourceEmail;
    }

    public OrderEducationForm sourceEmail(String sourceEmail) {
        this.sourceEmail = sourceEmail;
        return this;
    }

    public void setSourceEmail(String sourceEmail) {
        this.sourceEmail = sourceEmail;
    }

    public String getPresent() {
        return present;
    }

    public OrderEducationForm present(String present) {
        this.present = present;
        return this;
    }

    public void setPresent(String present) {
        this.present = present;
    }

    public String getAttendanceStartDate() {
        return attendanceStartDate;
    }

    public OrderEducationForm attendanceStartDate(String attendanceStartDate) {
        this.attendanceStartDate = attendanceStartDate;
        return this;
    }

    public void setAttendanceStartDate(String attendanceStartDate) {
        this.attendanceStartDate = attendanceStartDate;
    }

    public String getAttendanceEndDate() {
        return attendanceEndDate;
    }

    public OrderEducationForm attendanceEndDate(String attendanceEndDate) {
        this.attendanceEndDate = attendanceEndDate;
        return this;
    }

    public void setAttendanceEndDate(String attendanceEndDate) {
        this.attendanceEndDate = attendanceEndDate;
    }

    public String getDiplomaAwardDate() {
        return diplomaAwardDate;
    }

    public OrderEducationForm diplomaAwardDate(String diplomaAwardDate) {
        this.diplomaAwardDate = diplomaAwardDate;
        return this;
    }

    public void setDiplomaAwardDate(String diplomaAwardDate) {
        this.diplomaAwardDate = diplomaAwardDate;
    }

    public String getStudentRegistrationNo() {
        return studentRegistrationNo;
    }

    public OrderEducationForm studentRegistrationNo(String studentRegistrationNo) {
        this.studentRegistrationNo = studentRegistrationNo;
        return this;
    }

    public void setStudentRegistrationNo(String studentRegistrationNo) {
        this.studentRegistrationNo = studentRegistrationNo;
    }

    public String getTown() {
        return town;
    }

    public OrderEducationForm town(String town) {
        this.town = town;
        return this;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getState() {
        return state;
    }

    public OrderEducationForm state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public OrderEducationForm country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public OrderEducationForm postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getNotes() {
        return notes;
    }

    public OrderEducationForm notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
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
        OrderEducationForm orderEducationForm = (OrderEducationForm) o;
        if (orderEducationForm.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderEducationForm.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderEducationForm{" +
            "id=" + getId() +
            ", typeDiploma='" + getTypeDiploma() + "'" +
            ", nameOfInstitution='" + getNameOfInstitution() + "'" +
            ", institutionLocalName='" + getInstitutionLocalName() + "'" +
            ", subject='" + getSubject() + "'" +
            ", performance='" + getPerformance() + "'" +
            ", typeOfInstitution='" + getTypeOfInstitution() + "'" +
            ", sourceWebsite='" + getSourceWebsite() + "'" +
            ", sourceName='" + getSourceName() + "'" +
            ", sourcePhone='" + getSourcePhone() + "'" +
            ", sourceEmail='" + getSourceEmail() + "'" +
            ", present='" + getPresent() + "'" +
            ", attendanceStartDate='" + getAttendanceStartDate() + "'" +
            ", attendanceEndDate='" + getAttendanceEndDate() + "'" +
            ", diplomaAwardDate='" + getDiplomaAwardDate() + "'" +
            ", studentRegistrationNo='" + getStudentRegistrationNo() + "'" +
            ", town='" + getTown() + "'" +
            ", state='" + getState() + "'" +
            ", country='" + getCountry() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
