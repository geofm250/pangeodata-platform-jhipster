package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ReferenceCheckReport.
 */
@Document(collection = "reference_check_report")
public class ReferenceCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name_of_reference")
    private String nameOfReference;

    @Field("designation_of_reference")
    private String designationOfReference;

    @Field("reference_response")
    private String referenceResponse;

    @Field("res_verified_date")
    private String resVerifiedDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNameOfReference() {
        return nameOfReference;
    }

    public ReferenceCheckReport nameOfReference(String nameOfReference) {
        this.nameOfReference = nameOfReference;
        return this;
    }

    public void setNameOfReference(String nameOfReference) {
        this.nameOfReference = nameOfReference;
    }

    public String getDesignationOfReference() {
        return designationOfReference;
    }

    public ReferenceCheckReport designationOfReference(String designationOfReference) {
        this.designationOfReference = designationOfReference;
        return this;
    }

    public void setDesignationOfReference(String designationOfReference) {
        this.designationOfReference = designationOfReference;
    }

    public String getReferenceResponse() {
        return referenceResponse;
    }

    public ReferenceCheckReport referenceResponse(String referenceResponse) {
        this.referenceResponse = referenceResponse;
        return this;
    }

    public void setReferenceResponse(String referenceResponse) {
        this.referenceResponse = referenceResponse;
    }

    public String getResVerifiedDate() {
        return resVerifiedDate;
    }

    public ReferenceCheckReport resVerifiedDate(String resVerifiedDate) {
        this.resVerifiedDate = resVerifiedDate;
        return this;
    }

    public void setResVerifiedDate(String resVerifiedDate) {
        this.resVerifiedDate = resVerifiedDate;
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
        ReferenceCheckReport referenceCheckReport = (ReferenceCheckReport) o;
        if (referenceCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), referenceCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReferenceCheckReport{" +
            "id=" + getId() +
            ", nameOfReference='" + getNameOfReference() + "'" +
            ", designationOfReference='" + getDesignationOfReference() + "'" +
            ", referenceResponse='" + getReferenceResponse() + "'" +
            ", resVerifiedDate='" + getResVerifiedDate() + "'" +
            "}";
    }
}
